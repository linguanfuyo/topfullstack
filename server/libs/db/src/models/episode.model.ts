import {prop,modelOptions,arrayProp,Ref} from '@typegoose/typegoose'
import { ApiOperation,ApiPropertyOptional } from '@nestjs/swagger';
import {Course} from './course.model'

@modelOptions({
	schemaOptions: {
		timestamps: true //设置这个timestamps为true 会默认的添加俩个字段 创建时间和更新时间
	}
})

export class Episode {
	@prop()  //指明这是一个数据库里面的字段@prop() 
	@ApiPropertyOptional({description: '名称',example: 'course1'})
	name: string
	
	@prop()
	@ApiPropertyOptional({description: '视频',example: ''})
	file: string
	
	@prop({ref: 'Course'})
	course: Ref<Course>

}