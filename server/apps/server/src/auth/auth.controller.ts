import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiPropertyOptional, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose'
import { AuthGuard } from '@nestjs/passport'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { githubDto } from './dto/github.dto'
import { JwtService } from '@nestjs/jwt'
import { CurrentUser } from './current-user.decorator'
/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */
const SMSClient = require('@alicloud/sms-sdk')
const accessKeyId = 'LTAI4G8FehQJ8vHDRCGq6WNG'
const secretAccessKey = '9s0BwO5wgXp4QyhnFvoVd1d7UgcGRX'

// 连接redis
const cacheManager = require('cache-manager');
const redisStore = require('cache-manager-redis-store');
const redisCache = cacheManager.caching({
	store: redisStore,
	host: '106.15.202.122', // default value
	port: 6868, // default value 6379
	auth_pass: '123456',
	db: 0,
	ttl: 600
});
// listen for redis connection error event
const redisClient = redisCache.store.getClient();
redisClient.on('error', (error) => {
	console.log(error);
});


@Controller('auth')
@ApiTags('用户')
export class AuthController {

	constructor(
		private jwtService: JwtService,
		@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>
	) { }

	//注册接口
	@Post('register')
	@ApiOperation({ summary: '用户注册' })
	async register(@Body() data: RegisterDto) {
		if (data.type === 'github') {
			const res1 = await this.userModel.findOne({ user_id: data.user_id })
			if (res1) {
				return { code: 1, message: '用户已同步', user: res1 }
			}
		} else {
			const res = await this.userModel.findOne({ username: data.username })
			if (res) {
				return { code: 0, message: '用户名已占用' }
			}
		}
		const res2 = await this.userModel.findOne({ phone: data.phone })
		if (res2) {
			return { code: 2, message: '手机号已注册' }
		}
		await this.userModel.create(data)
		return { code: 200, message: '用户创建成功', user: res2 }
	}
	// 验证码登录
	@Post('codeLogin')
	@ApiOperation({ summary: '验证码登录' })
	async codeLogin(@Body() data, @Res() res) {
		const user = await this.userModel.findOne({ phone: data.data.phone })
		if (!user) {
			res.send({
				message: '用户不存在',
				code: 402
			})
			return
		}
		redisCache.get('code', (err, result) => {
			if (result === data.data.code) {
				res.send({
					token: this.jwtService.sign(String(user._id)),
					code: 200,
					message: '登陆成功',
					user: user
				})

			} else {
				res.send({
					message: '验证码错误',
					code: 401
				})
			}
		});
	}

	//登录接口
	@Post('login')
	@ApiOperation({ summary: '用户登录' })
	@UseGuards(AuthGuard('local'))
	async login(@Body() data: LoginDto, @CurrentUser() user: DocumentType<User>, @Req() req) {
		if (req.user._id) {
			return {
				token: this.jwtService.sign(String(req.user._id)),
				user: req.user,
				msg: '登陆成功'
			}
		} else {
			return req.user
		}

	}

	//获取用户信息
	@Get('user')
	@ApiOperation({ summary: '用户信息' })
	@UseGuards(AuthGuard('jwt'))
	async user(@CurrentUser() user: DocumentType<User>, @Req() req) {
		try {
			return req.user;
		} catch (error) {
			return {
				message: 'token无效'
			}
		}


	}
	// 退出登录
	@Post('logout')
	@ApiOperation({ summary: '退出登录' })
	@UseGuards(AuthGuard('jwt'))
	async logout(@CurrentUser() user: DocumentType<User>) {
		return {
			code: 2000,
			message: '退出成功'
		};
	}

	// 修改用户基本信息
	@Post('userEdit')
	@ApiOperation({ summary: '更新用户信息' })
	@UseGuards(AuthGuard('jwt'))
	async userEdit(@Body() body, @Req() req) {
		const res = await this.userModel.findByIdAndUpdate(req.user._id, { $set: { avatar: body.avatar, username: body.username, desc: body.desc } }, { new: true })
		return {
			code: 200,
			message: '修改成功',
			user: res
		};
	}

	// 获取验证码
	@Post('getCode')
	@ApiOperation({ summary: '获取验证码' })
	async getCode(@Body() body) {
		// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
		//初始化sms_client
		const smsClient = new SMSClient({ accessKeyId, secretAccessKey })
		// 生成随机验证码
		let num = "";
		for (let i = 0; i < 4; i++) {
			num += Math.floor(Math.random() * 10);
		}
		//发送短信
		smsClient.sendSMS({
			PhoneNumbers: body.phone,
			SignName: '超哥商城',
			TemplateCode: 'SMS_205392983',
			TemplateParam: `{"code": "${num}"}`
		}).then(function (res) {
			const { Code } = res
			// 发送成功
			if (Code === 'OK') {
				//保存验证码到本地缓存 并定时删除
				const ttl = 60;
				redisCache.set('code', num, { ttl: ttl }, (err) => {
					if (err) {
						throw err;
					}
				});

			}
		}, function (err) {
			console.log(err)
		})
		return {
			code: 200,
			message: '验证码已发送'
		};
	}

	@Post('githubLogin')
	@ApiOperation({ summary: '获取github用户token' })
	async getGithubToken(@Body() data: githubDto) {
		if (data.type === 'github') {
			const res = await this.userModel.findOne({ user_id: data.user_id })
			if (res) {
				return {
					token: this.jwtService.sign(String(res._id)),
					message: '同步token',
					code: 200,
					user: res
				}
			} else {
				return {
					message: '用户不存在',
					code: 4
				}
			}
		}
	}

}
