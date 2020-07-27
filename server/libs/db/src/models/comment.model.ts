import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from './user.model'
import { Course } from './course.model'
import { Episode } from './episode.model'
@modelOptions({
	schemaOptions: {
		timestamps: true //设置这个timestamps为true 会默认的添加俩个字段 创建时间和更新时间
	}
})

export class Comment {
	@prop({ ref: 'User' })  //指明这是一个数据库里面的字段@prop() 
	@ApiPropertyOptional({ description: '用户', example: 'course1' })
	user: Ref<User>

	@prop({ enum: ['Course', 'Episode'] })
	@ApiPropertyOptional({ description: '类型', example: '' })
	type: string

	@prop({ refPath: 'type' })
	object: Ref<Course | Episode>

	@prop()
	content: string
}