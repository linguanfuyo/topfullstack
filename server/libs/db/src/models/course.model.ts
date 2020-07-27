import {prop,modelOptions,arrayProp,Ref} from '@typegoose/typegoose'
import { ApiOperation,ApiPropertyOptional } from '@nestjs/swagger';
import {Episode} from './episode.model'

@modelOptions({
	schemaOptions: {
		timestamps: true, //设置这个timestamps为true 会默认的添加俩个字段 创建时间和更新时间
		toJSON: { virtuals: true } // 开启虚拟字段
	}
})

export class Course {
	@prop()  //指明这是一个数据库里面的字段@prop() 
	@ApiPropertyOptional({description: '课程名称',example: 'course1'})
	name: string
	
	@prop()
	@ApiPropertyOptional({description: '封面图',example: ''})
	cover: string
	
	//关联Episode数据库  这是一个虚拟字段 只能查出来 不能保存到数据库
	@arrayProp({ref: 'Episode',localField: '_id',foreignField: 'course'})
	// @ApiPropertyOptional({description: '课时'})
	episodes: Ref<Episode>[]
}