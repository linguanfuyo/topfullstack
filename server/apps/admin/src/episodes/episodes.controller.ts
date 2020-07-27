import { Controller,Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import {Episode} from '@libs/db/models/episode.model';
import {Course} from '@libs/db/models/course.model';
import {Crud} from 'nestjs-mongoose-crud'
import { ApiTags,ApiOperation,ApiPropertyOptional } from '@nestjs/swagger';
import {ReturnModelType} from '@typegoose/typegoose'
@Crud({
	model: Episode
})
@Controller('episodes')
@ApiTags('课时管理')
export class EpisodesController {
	
	//构造器函数 中用依赖注入的方法 注入schema模型
	constructor(
	@InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>,
	@InjectModel(Course) private readonly courseModel: ReturnModelType<typeof Course>
	){}
	
	//写一个获取option的接口  配合avue使用
	@Get('option')
	async option(){
		// 查询course 表的信息 并转换一下格式
		const courses  = (await this.courseModel.find()).map(v => ({
			label: v.name,
			value: v._id
		}))
		
		return {
			          title:'课时管理',
			          column:[ 
			             {label:'课时名称',prop:'name',sortable: true,search: true,span: 24,row: true},
			             {label:'所属课程',prop:'course',type: 'select',dicData: courses,span: 24},
						 {label:'视频文件',prop:'file',width:80,type: 'upload',action:'upload',listType: 'picture-img',span: 24}
			          ]
		}
	}
}
