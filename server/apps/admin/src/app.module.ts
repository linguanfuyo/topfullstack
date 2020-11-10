import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@app/common'
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
		/* MulterModule.register({
			storage: MAO({
					config: {
						region: 'oss-cn-hangzhou',
						accessKeyId: 'LTAI4G8FehQJ8vHDRCGq6WNG',
						accessKeySecret: '9s0BwO5wgXp4QyhnFvoVd1d7UgcGRX',
						bucket: 'lgf-tofullstack'
					}
				})
			// dest: 'uploads' // 存储位置 目录名称
		}), *///本地上传模块   会在项目的跟地址自动的创建uploads
		// DbModule,//数据库模块

		CommonModule, //导入公共数据库模块
		UsersModule,
		CoursesModule,
		EpisodesModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
