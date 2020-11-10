import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  //图片上传
  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()  //需要token验证 才可以获取
  @UseInterceptors(FileInterceptor('file'))  //拦截器
  async upload(@UploadedFile('file') file) {
    return file
  }
}
