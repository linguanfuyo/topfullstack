import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';

import { TypegooseModule } from 'nestjs-typegoose'
//导入模型  并封装成schema模型
import { User } from './models/user.model'
import { Course } from './models/course.model'
import { Episode } from './models/episode.model'
import { Action } from './models/action.model'
import { Comment } from './models/Comment.model'
import { Article } from './models/article.model'
import { Music } from './models/music.model'
const modles = TypegooseModule.forFeature([User, Course, Episode, Action, Comment, Article, Music])
//把db.module 变为全局模块
@Global()
@Module({
	imports: [
		TypegooseModule.forRootAsync({
			useFactory() {
				return {
					uri: process.env.DB,
					useNewUrlParser: true,
					useUnifiedTopology: true,
					useCreateIndex: true,
					useFindAndModify: false
				};
			},
		}),
		//这个是异步加载的 会导致config 文件未加载就加载改模块
		// TypegooseModule.forRoot(process.env.DB,{
		//  useNewUrlParser: true,
		//  useUnifiedTopology: true,
		//  useCreateIndex: true,
		//  useFindAndModify: false
		// }),
		modles,
	],

	providers: [DbService],
	exports: [DbService, modles],
})
export class DbModule { }
