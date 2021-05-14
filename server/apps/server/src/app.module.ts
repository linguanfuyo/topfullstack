import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@app/common'
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { ActionsModule } from './actions/actions.module';
import { CommentsModule } from './comments/comments.module';
import { MulterModule } from '@nestjs/platform-express';
import { VideosModule } from './videos/videos.module';
import { ReportsModule } from './reports/reports.module';
import { HistoryModule } from './history/history.module';
import { NoticeModule } from './notice/notice.module';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesModule } from './articles/articles.module';
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
		VideosModule,
		ReportsModule,
		HistoryModule,
		NoticeModule,
		ArticlesModule,
	],
	controllers: [AppController, ArticlesController],
	providers: [AppService],
})
export class AppModule { }
