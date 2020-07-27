import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //本地托管静态资源文件夹uploads  参数一：文件夹地址 只写文件夹名基于项目跟路径查找
  // app.useStaticAssets('uploads',{
	 //  prefix:'/uploads' //添加地址前缀
  // })
  //允许跨域
  app.enableCors()
  //配置Swagger 文档
  const options = new DocumentBuilder()
      .setTitle('全栈之巅后台管理api')
      .setDescription('全栈之巅后台管理api接口文档')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.ADMIN_PORT || 3001
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`)
}
bootstrap();
