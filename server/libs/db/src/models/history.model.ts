import { prop, modelOptions, Ref } from '@typegoose/typegoose'
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

export class History {
	@prop({ ref: 'User' })  //指明这是一个数据库里面的字段@prop() 
	@ApiPropertyOptional({ description: '用户', example: 'course1' })
	user: Ref<User>

	@prop({ enum: ['Course', 'Acticle', 'Music', 'Video', 'User'], default: 'Video' })
	@ApiPropertyOptional({ description: '媒体类型', example: '' })
	type: string

	@prop({ enum: ['look', 'like', 'delete', 'collection', 'follow', 'unlike'], default: 'look' })
	@ApiPropertyOptional({ description: '记录类型', example: '' })
	action: string

	@prop({ refPath: 'type' })
	object: Ref<Course | Article | Music | Video | User>
}