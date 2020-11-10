import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport'
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs'


export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {
		super({
			//取出token
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			//取SECRET
			secretOrKey: process.env.SECRET
			//
		} as StrategyOptions)
	}
	//在这里写jwt验证  jwt策略id
	async validate(id) {
		return await this.userModel.findById(id)
	}
}