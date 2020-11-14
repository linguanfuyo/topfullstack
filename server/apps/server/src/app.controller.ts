import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { AppService } from './app.service';
import { Category } from '@libs/db/models/category.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CategoryDto } from './auth/dto/category.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel(Category) private readonly categoryModel: ReturnModelType<typeof Category>
  ) { }

  //图片上传
  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()  //需要token验证 才可以获取
  @UseInterceptors(FileInterceptor('file'))  //拦截器
  async upload(@UploadedFile('file') file) {
    return file
  }

  //添加分类
  @Post('addCategory')
  async addCategory(@Body() data: CategoryDto) {
    await this.categoryModel.create(data)
    return {
      message: '添加成功',
      code: 200
    }
  }
  //获取分类
  @Get('getCategory')
  async getCategory() {
    const category = await this.categoryModel.find()
    return {
      message: '添加成功',
      code: 200,
      category: category
    }
  }
}
