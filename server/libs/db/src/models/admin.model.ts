import { prop, modelOptions } from '@typegoose/typegoose'
import { ApiPropertyOptional } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs'
@modelOptions({
	schemaOptions: {
		timestamps: true //设置这个timestamps为true 会默认的添加俩个字段 创建时间和更新时间
	}
})

export class Admin {
	@prop()
	@ApiPropertyOptional({ description: '用户名', example: 'user1' })
	name: string

	@prop({
		select: false, //在常规的查询中不返回密码
		get(val) {
			return val
		},
		set(val) {
			return val ? hashSync(val) : val
		}
	})
	@ApiPropertyOptional({ description: '密码', example: 'password1' })
	password: string

}