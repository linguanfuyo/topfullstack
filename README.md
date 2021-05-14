# topfullstack

#### 介绍

Nestjs+Nuxt 全栈开发 用户视频网站

ui:Vuetify 和 ant-design-vue(Vuetify 组件太少了.....)

#### 软件架构

开发流程服务端 > web 端 先后台 再前台

手动开启数据库 `mongod --storageEngine mmapv1 -dbpath d:\E\mongoData`

启动后台 进入 server 文件夹 启动子项目 `nest start -w admin/web`

启动 redis(本项目 redis 部署在服务器上)

启动前端项目 Nuxt: `npm run dev`

### 开发细节

##### 使用 nestjs 创建服务端项目

请确保您的操作系统上安装了 Node.js（>= 10.13.0）。

命令行输入 `npm -v` 查看本地的 node 版本

本项目使用 npm 来进行包管理

1.安装 nestjs 脚手架，来创建和管理项目

`npm i -g @nestjs/cli`

i 为 install 的简写 -g 表示安装到全局 -s 表示只安装到本项目 -d 表示只安装到项目的开发依赖中

npm 常用命令

npm install -s|d|g xxx（包名） 安装、更新依赖

npm uninstall xxx 删除对应的依赖包

npm -v 查看 npm 版本

npm list 查看当前项目的依赖列表

npm -g|s|d outdated 查看可更新的包列表

2.使用脚手架创建 nest 项目
`nest new project-name`

nest 基本命令

命令 别名 描述
nest new xxx nest n xxx 创建项目
nest generate co xxx nest g co xxx 创建或修改对应的文件
nest build 打包程序。
nest start 启动默认程序 nest start -w xxx 启动子项目。
nest add 导入已打包为 nest 的库，运行其安装示意图。
nest update nest u 更新包中的 @nestjs package.json dependencies 列表的 @latest 版本。
nest info nest i 现实已安装的 nest 包和其他有用的系统信息。

项目结构

src
|_ app.controller.ts # 控制器
|_ app.service.ts # 服务
|_ app.module.ts # 根模块
|_ main.ts # 项目入口，可以选择平台、配置中间件等
node_modules # 依赖
nest-cli.json
package.json # 项目配置文件
tsconfig.json # ts 配置
tslint.json # tslint 配置

main.ts

```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //允许跨域
  app.enableCors()
  //配置Swagger 文档
  const options = new DocumentBuilder()
    .setTitle('星空之巅前端api')
    .setDescription('供网站和app使用的api接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.SERVER_PORT || 3002
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`)
}
bootstrap();
```

运行默认项目项目

```
npm run start
```

运行子项目项目

```
npm start -w xxx
```

此命令在 src 目录中的 main.ts 文件中定义的端口上启动 HTTP 服务器。在应用程序运行时, 打开浏览器并访问 http://localhost:3000/。 你
就哭看到 Hello world! 信息表示项目已经启动。

1.安装脚手架 `cnpm i --g @nestjs/cli `

2.使用 nest new xxx 创建服务端项目`nest new server cd server`

3.nest g app admin 创建子项目

4.启动子项目 `nest start -w admin`

5.创建公共包文件夹 `nest g lib db @libs`

6.安装数据库连接数据库所需要的包 `npm i --s nestjs-typegoose @typegoose/typegoose`

7.`cnpm i -S @types/mongoose mongoose`

```
<pre>
    <code>
	imports: [
		  TypegooseModule.forRoot('mongodb://localhost/topfullstack',{
     useNewUrlParser: true,
			  useUnifiedTopology: true,
			  useCreateIndex: true,
			  useFindAndModify: false
		  }),
		  modles,
  ],
    </code>
</pre>
```

8.`nest g mo -p admin users/nest g co -p admin users` 在 admin 子项目里新建一个 user 模块 -p 指定目录

9.安装 `cnpm i -S nestjs-mongoose-crud` 用户快速完成对数据库的增删改查

10.安装 `cnpm i -S @nestjs/swagger swagger-ui-express` 用于写接口文档

11.安装验证管道 `npm i -S class-validator class-transformer`

12.配置 swagger 文档

(```)

<pre>
    <code>
        import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
		//配置Swagger 文档
		const options = new DocumentBuilder()
		    .setTitle('Cats example')
		    .setDescription('The cats API description')
		    .setVersion('1.0')
		    .addTag('cats')
		    .build();
		  const document = SwaggerModule.createDocument(app, options);
		  SwaggerModule.setup('api', app, document);
    </code>
</pre>

(```)

13.创建并定义 course 的模型

14.创建 course 的子模块 `nest g mo -p admin users/nest g co -p admin users`

15.服务端里设置跨域 app.enableCors()

16.根据前端的需要 写一个 option 接口 把 avue 所需要的 option 在后台传过去

17.`npm i --save @nestjs/config` 安装配置忘记包 使用环境变量的包

`nest g lib common` 创建 common 公共文件夹 默认存放在 libs 下 用于写一些环境变量 导入并

(`) import { ConfigModule } form '@nestjs/config' ConfigModule.forRoot({ isGlobal: true }) (`)

18.`nest g mo courses/nest g co courses` 创建 server 子项目所需的文件夹

19.启动 server 子项目 `nest start -w server`

20.创建 auth 模块 用于写用户登录注册的接口

21.`cnpm i -S bcryptjs` 使用 bcryptjs 对密码进行加密

22.使用 passport 来实现登录验证 在 auth 文件夹下 先创建一个 local.strategy.ts 文件 用于存放登录策略

23.`cnpm i -S passport @nestjs/passport passport-local passport-jwt `

24.开始使用 引用

25.cnpm i -S @nestjs/jwt 使用 生成 token 在 common.module 里面注册

26.`nest g mo/co -p server actions` 生成 action 模块 用于存放用户的操作

27.建立评论模型 创建评论模块 `nest g mo/co comments`

28.模型类型的字段需要关联表名称

```
    @prop({ ref: 'Category', default: '5faf48f70897c0212826274f' })  //指明这是一个数据库里面的字段@prop()
	@ApiPropertyOptional({ description: '标签', example: '生活' })
	category: Ref<Category>[]

	@prop({ ref: 'User' })  //指明这是一个数据库里面的字段@prop()  否则populate查不出来
	@ApiPropertyOptional({ description: '作者id', example: '林阿富' })
	uid: Ref<User>
```

29. 更新时让某字段自增

```
Video.update({ _id: req.params.id },
               { $set: req.body, $inc: { count: 1 } },
               { multi: false },  callback);
```

30. 当查询的字段为数组时，用来$in

```
// 例子 category为数组字段  lean()把文档对象转换为js对象 建议使用-不然前端有可能拿不到值
const res = await this.model.findOne({ _id: '' }).populate('uid').lean()
const res2 = await this.model.find({category: { $in: res.category }})
```

##### admin 端 vscode 编译器代码排斥

1. 用 vue create admin 创建项目与 server 同级

2. vue add typescript 添加 typescript

3. 添加 element-ui 创建相应的页面 和路由规则

4. 安装 npm i -S axios @types/axios 在全局导入并配置

5. 要到 serve 服务端里设置跨域 app.enableCors()

6. 使用 npm i -S vue-ele-form

7. 使用 npm i @smallwei/avue -S 快速开发前端增删改查页面 注意: 编辑需要修改一下 row 数据

8. 把 option 做成可扩展的的数据

9. 把前端的请求地址也做成可扩展的变量 变量的值来值路由地址

10. 在对象里 {[name]: this.query} [xx]表示键也是个变量

11. 文件上传 需要导入文件处理模块 import { MulterModule } from '@nestjs/platform-express'

12. MulterModule.register({
    dest: 'uploads' //目录名称
    }),//本地上传模块 会在项目的跟地址自动的创建 uploads

13. 使用阿里云 oss 存储 `cnpm i -S multer-aliyun-oss` 下载 oss 包 server 文件夹

14. 引入 并配置

###web 端

1. 使用 nuxtjs 来搭建项目

2. `npx create-nuxt-app <项目名>`

3. 使用 vuetify ui 来美化页面

4. 启动项目 npm run dev

5. 在 nuxt 里 没有路由文件夹 项目的 pages 文件夹结构就是路由

6. 没有 main.js nuxt.config.js 是主要文件 里面有外部文件的依赖等等 .env 为配置环境变量文件

7. 在 web 安装 `cnpm i -S @nuxtjs/auth`

``
