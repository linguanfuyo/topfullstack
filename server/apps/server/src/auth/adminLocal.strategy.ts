import { Strategy, ISstrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport'
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { compareSync } from 'bcryptjs'
import { Admin } from '@libs/db/models/admin.model';

export class AdminLocalStrategy extends PassportStrategy(Strategy,'adminLocal') {
	constructor(@InjectModel(Admin) private readonly adminModel: ReturnModelType<typeof Admin>) {
		super({
			nameFiled: 'name',
			passwordFiled: 'password'
		} as ISstrategyOptions)
	}
	//在这里写登录验证  本地策略
	async validate(name: string, password: string) {
		console.log(1)
		const user = await this.adminModel.findOne({ name: name }).select('+password')
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