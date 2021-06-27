import { Body, Controller, Get, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { AppService } from './app.service';
import { Category } from '@libs/db/models/category.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CategoryDto } from './auth/dto/category.dto';

@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel(Category) private readonly categoryModel: ReturnModelType<typeof Category>
  ) { }

  //图片上传
  @Post('/upload')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()  //需要token验证 才可以获取
  @UseInterceptors(FileInterceptor('file'))  //拦截器
  async upload(@UploadedFile('file') file) {
    return file
  }

  //图片上传
  @Post('/adminUpload')
  @UseInterceptors(FileInterceptor('file'))  //拦截器
  async adminUpload(@UploadedFile('file') file) {
    return file
  }

  //添加分类
  @Post('/addCategory')
  async addCategory(@Body() data: CategoryDto) {

    const res = await this.categoryModel.create(data)
    return {
      message: '添加成功',
      code: 200,
      data: res
    }
  }

  //添加分类
  @Post('/category/delete')
  async deleteCategory(@Body() data: {_id:string},@Res() res) {
    await this.categoryModel.deleteOne({_id:data._id})
    res.send({
      message: '删除成功',
      code: 200,
      data:'成功'
    })
  }
  
  //获取分类
  @Get('/getCategory')
  async getCategory() {
    const category = await this.categoryModel.find()
    return {
      message: '添加成功',
      code: 200,
      category: category
    }
  }

    // 获取分类列表
    @Post('/category/list')
    @ApiOperation({ summary: '获取分类列表' })
    async categoryList(@Body() dto,@Res() res) {
        try {
            const result = await this.categoryModel.find({$or: [{name: {$regex: dto.name}}]})
			.limit(dto.limit).skip(dto.limit*(dto.page-1)).lean();
            res.send({
                msg:'成功',
                code: 200,
                data: {
                    list:result,
                    count: await this.categoryModel.countDocuments()
                }
            })
        } catch (error) {
            console.log(error)
        }
        
    }
}
