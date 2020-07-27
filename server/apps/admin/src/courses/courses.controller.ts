import { Controller,Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import {Course} from '@libs/db/models/course.model';
import {Crud} from 'nestjs-mongoose-crud'
import { ApiTags,ApiOperation,ApiPropertyOptional } from '@nestjs/swagger';
import {ReturnModelType} from '@typegoose/typegoose'
@Crud({
	model: Course
})
@Controller('courses')
@ApiTags('课程管理')
export class CoursesController {
	//构造器函数 中用依赖注入的方法 注入schema模型
	constructor(@InjectModel(Course) private readonly model: ReturnModelType<typeof Course>){}
	//写一个获取option的接口  配合avue使用 sortable: true 只实现了前端排序
	@Get('option')
	option(){
		return {
			          title:'课程管理',
					  excelBtn: true,
			          column:[ 
			             {label:'课程名称',prop:'name',sortable: true,search: true,span:24,regex: true,row:true},
			             {label:'课程封面图',prop:'cover',width: 90,type: 'upload',listType: 'picture-img',row:true,action: 'upload'}
			          ]
		}
	}
}
