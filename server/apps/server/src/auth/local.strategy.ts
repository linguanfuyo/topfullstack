import { Strategy, ISstrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport'
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs'


export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
	constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {
		super({
			usernameFiled: 'username',
			passwordFiled: 'password'
		} as ISstrategyOptions)
	}
	//在这里写登录验证  本地策略
	async validate(username: string, password: string) {
		const user = await this.userModel.findOne({ username: username }).select('+password')
		if (!user) {
			return {
				message: '用户名错误',
				code: 400
			}
		}
		if (!compareSync(password, user.password)) {
			return {
				message: '密码错误',
				code: 400
			}
		}
		return user
	}
}