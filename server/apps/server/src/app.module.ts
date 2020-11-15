import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@app/common'
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { ActionsModule } from './actions/actions.module';
import { CommentsModule } from './comments/comments.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServerModule } from './videos/server/server.module';
import { VideosController } from './videos/videos.controller';
const MAO = require('multer-aliyun-oss'); //引入oss 包
@Module({
	imports: [
		MulterModule.registerAsync({
			useFactory() {
				return {
					storage: MAO({
						config: {
							region: process.env.OSS_REGION,
							accessKeyId: process.env.OSS_ACCESS_KEY_ID,
							accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
							bucket: process.env.OSS_BUCKET,
						}
					})
					// dest: 'uploads' // 存储位置 目录名称
				}
			}
		}),
		CommonModule,
		CoursesModule,
		AuthModule,
		ActionsModule,
		CommentsModule,
		ServerModule,
	],
	controllers: [AppController, VideosController],
	providers: [AppService],
})
export class AppModule { }
