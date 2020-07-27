import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiPropertyOptional, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose'
import { AuthGuard } from '@nestjs/passport'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { JwtService } from '@nestjs/jwt'
import { CurrentUser } from './current-user.decorator'
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
		const { username, password } = data
		const user = await this.userModel.create({
			username: username,
			password: password
		})
		return user;
	}

	//登录接口
	@Post('login')
	@ApiOperation({ summary: '用户登录' })
	@UseGuards(AuthGuard('local'))
	async login(@Body() data: LoginDto, @CurrentUser() user: DocumentType<User>, @Req() req) {

		return {
			token: this.jwtService.sign(String(req.user._id))
		}
	}

	//
	@Get('user')
	@ApiOperation({ summary: '用户信息' })
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth()  //需要token验证 才可以获取
	async user(@CurrentUser() user: DocumentType<User>, @Req() req) {
		return req.user;
	}

}
