import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs'
import { Course } from './course.model'
@modelOptions({
	schemaOptions: {
		timestamps: true //设置这个timestamps为true 会默认的添加俩个字段 创建时间和更新时间
	}
})

export class User {
	@prop()
	@ApiPropertyOptional({ description: '用户名', example: 'user1' })
	username: string

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

	// {default: 'https://lgf-tofullstack.oss-cn-hangzhou.aliyuncs.com/34f5e569c5aa6d16ca890c7e922818b9.jpg'}
	@prop({ default: '' })
	@ApiPropertyOptional({ description: '头像', example: 'aaa.png' })
	avatar: string


	@prop({ default: '' })
	@ApiPropertyOptional({ description: '手机号', example: '13060858604' })
	phone: string

	@prop({ default: '这个人很懒什么都没有留下' })
	@ApiPropertyOptional({ description: '签名', example: '这个人很懒什么都没有留下' })
	desc: string

	@prop({ default: 'local' })
	@ApiPropertyOptional({
		description: '用户类型', example: '本地用户'
	})
	type: string

	@prop({ default: '' })
	@ApiPropertyOptional({
		description: '第三方用户的id', example: '第三方用户的id'
	})
	user_id: string

	// @arrayProp({ref: 'Course'})
	// liked: Ref<Course>[]


}