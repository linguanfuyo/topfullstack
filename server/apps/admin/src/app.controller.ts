import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
//导入文件拦截器
import { FileInterceptor } from '@nestjs/platform-express'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  //图片上传
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))  //拦截器
  //表示取的是文件
  async upload(@UploadedFile('file') file) {
    return file
    // return {url: `http://localhost:3000/uploads/${file.filename}`}
  }
}
