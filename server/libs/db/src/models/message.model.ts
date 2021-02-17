import { prop, modelOptions, Ref } from '@typegoose/typegoose'
import { ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from './user.model'
import { Course } from './course.model'
import { Article } from './article.model'
import { Music } from './music.model'
import { Video } from './Video.model';
import { Action } from './action.model';
@modelOptions({
	schemaOptions: {
		timestamps: true //设置这个timestamps为true 会默认的添加俩个字段 创建时间和更新时间
	}
})

// TODO:
export class Message {
	@prop({ ref: 'User' })  //指明这是一个数据库里面的字段@prop() 
	@ApiPropertyOptional({ description: '用户', example: 'course1' })
	user: Ref<User>

	@prop({ enum: ['System', 'User'], default: 'System' })
	@ApiPropertyOptional({ description: '通知类型', example: '' })
	type: string

	@prop({ enum: ['Like', 'unLike', 'Music', 'Video', 'User'], default: 'Video' })
	@ApiPropertyOptional({ description: '类型', example: '' })
	action: Ref<Action>

	@prop({ ref: 'User' })
	@ApiPropertyOptional({ description: '该通知谁', example: '' })
	object: Ref<User>
}