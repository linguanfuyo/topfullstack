import { prop, modelOptions, Ref } from '@typegoose/typegoose'
import { ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from './user.model'
import { Video } from './Video.model';
@modelOptions({
	schemaOptions: {
		timestamps: true //设置这个timestamps为true 会默认的添加俩个字段 创建时间和更新时间
	}
})

export class Comment {
	@prop({ ref: 'User' })  //指明这是一个数据库里面的字段@prop() 
	@ApiPropertyOptional({ description: '评论人', example: 'course1' })
	uid: Ref<User>

	@prop({ ref: 'Video' })
	@ApiPropertyOptional({ description: '评论对象', example: 'course1' })
	object: Ref<Video>

	@prop({ ref: 'Comment', default: null })
	@ApiPropertyOptional({ description: '二级评论是在那一条视频的，空为一级评论', example: 'course1' })
	parentId: Ref<Comment>

	@prop()
	@ApiPropertyOptional({ description: '评论内容', example: '' })
	content: string

}