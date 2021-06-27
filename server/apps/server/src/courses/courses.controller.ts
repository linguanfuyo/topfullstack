import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Course } from '@libs/db/models/course.model';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags, ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose'
import { AuthGuard } from '@nestjs/passport';
@Crud({
	model: Course,
	routes: {
		create: false,
		update: false,
		delete: false
	}
})
@Controller('/api/courses')
@ApiTags('课程展示')
export class CoursesController {
	//构造器函数 中用依赖注入的方法 注入schema模型
	constructor(@InjectModel(Course) private readonly model: ReturnModelType<typeof Course>) { }

}