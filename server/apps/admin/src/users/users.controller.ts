import { Controller,Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import {User} from '@libs/db/models/user.model';
import {Crud} from 'nestjs-mongoose-crud'
import { ApiTags,ApiOperation,ApiPropertyOptional } from '@nestjs/swagger';
/* import { IsNotEmpty } from 'class-validator'
// 给create接口加上类型约束 和描述
class CreatePostsDto {
	//修饰器
	@ApiPropertyOptional({description: '帖子标题1'})
	@IsNotEmpty({message: '请填写标题'})
	title: string
	@ApiPropertyOptional({description: '帖子内容'})
	content: string
} */

@Crud({
	model: User
})
@Controller('users')
@ApiTags('用户管理')
export class UsersController {
	//构造器函数 中用依赖注入的方法 注入schema模型  
	constructor(@InjectModel(User) private readonly model){}
	//写一个获取option的接口  配合avue使用
	@Get('option')
	option(){
		return {
			          title:'用户管理',
					  // searchMenuSpan:4,
			          column:[ 
			             {label:'用户名',prop:'username',sortable: true,search: true},
			             {label:'密码',prop:'password'}
			          ]
		}
	}
}
