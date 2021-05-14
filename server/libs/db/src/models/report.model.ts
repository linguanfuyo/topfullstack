import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from './user.model'
import { Course } from './course.model'
import { Article } from './article.model'
import { Music } from './music.model'
import { Video } from './Video.model';
@modelOptions({
	schemaOptions: {
		timestamps: true //设置这个timestamps为true 会默认的添加俩个字段 创建时间和更新时间
	}
})

export class Report {
	@prop({ ref: 'User' })  //指明这是一个数据库里面的字段@prop() 
	@ApiPropertyOptional({ description: '上报用户', example: 'course1' })
	uid: Ref<User>

	@prop({ enum: ['Course', 'Acticle', 'Music', 'Video', 'Comment', 'User'] })
	@ApiPropertyOptional({ description: '上报媒体类型', example: '' })
	type: string

	@prop({ default: null })
	@ApiPropertyOptional({ description: '错误类型', example: '' })
	faultType: string

	@prop({ refPath: 'type', default: null })
	@ApiPropertyOptional({ description: '上报对象', example: '' })
	object: Ref<Course | Article | Music | Video | Comment>

	@prop({ default: null })
	@ApiPropertyOptional({ description: '描述内容', example: '' })
	content: string

	@prop({ default: null })
	@ApiPropertyOptional({ description: '联系电话', example: '' })
	phone: string

	@prop({ default: 1 })
	@ApiPropertyOptional({ description: '状态', example: '' })
	status: number

}