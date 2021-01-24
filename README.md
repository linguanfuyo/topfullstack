# topfullstack

#### 介绍
Nestjs+Nuxt 全栈开发 用户视频网站

ui:Vuetify和ant-design-vue(Vuetify组件太少了.....)

#### 软件架构
开发流程服务端 > web端  先后台 再前台

开启数据库 `mongod --storageEngine mmapv1 -dbpath d:\E\mongoData`

进入server文件夹 启动子项目 `nest start -w admin/web`

启动redis(本项目redis部署在服务器上)

启动Nuxt: `npm run dev`

### 开发细节

##### 使用nestjs 创建服务端项目

1.安装脚手架 `cnpm i --g @nestjs/cli `

2.使用nest new xxx 创建服务端项目`nest new server    cd server`

3.nest g app admin 创建子项目

4.启动子项目 `nest start -w admin`

5.创建公共包文件夹 `nest g lib db  @libs`

6.安装数据库连接数据库所需要的包 `npm i --s nestjs-typegoose @typegoose/typegoose`

7.`cnpm i -S  @types/mongoose mongoose`
(```)
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
(```)
8.`nest g mo -p admin users/nest g co -p admin users` 在admin子项目里新建一个user模块 -p指定目录

9.安装 `cnpm i -S nestjs-mongoose-crud` 用户快速完成对数据库的增删改查

10.安装 `cnpm i -S @nestjs/swagger swagger-ui-express` 用于写接口文档

11.安装验证管道 `npm i -S class-validator class-transformer`

12.配置swagger 文档

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

13.创建并定义course 的模型

14.创建course 的子模块 `nest g mo -p admin users/nest g co -p admin users`

15.服务端里设置跨域 app.enableCors()

16.根据前端的需要 写一个option接口 把avue所需要的option 在后台传过去

17.`npm i --save @nestjs/config` 安装配置忘记包 使用环境变量的包

`nest g lib common` 创建common 公共文件夹 默认存放在libs下  用于写一些环境变量 导入并

(```)
import { ConfigModule } form '@nestjs/config'
ConfigModule.forRoot({
		  isGlobal: true
	  })
(```)
	  
18.`nest g mo courses/nest g co courses`  创建server子项目所需的文件夹

19.启动server子项目 `nest start -w server`

20.创建auth模块 用于写用户登录注册的接口

21.`cnpm i -S bcryptjs` 使用bcryptjs 对密码进行加密

22.使用passport 来实现登录验证 在auth文件夹下 先创建一个local.strategy.ts 文件 用于存放登录策略

23.`cnpm i -S passport @nestjs/passport passport-local passport-jwt `

24.开始使用 引用

25.cnpm i -S @nestjs/jwt 使用 生成token  在common.module 里面注册

26.`nest g mo/co -p server actions` 生成action模块 用于存放用户的操作

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

##### admin端  vscode编译器代码排斥

1. 用vue create admin  创建项目与server同级

2. vue add typescript 添加typescript

3. 添加element-ui   创建相应的页面 和路由规则

4. 安装 npm i  -S axios @types/axios    在全局导入并配置

5. 要到serve 服务端里设置跨域 app.enableCors()

6. 使用 npm i -S vue-ele-form

7. 使用npm i @smallwei/avue -S  快速开发前端增删改查页面  注意: 编辑需要修改一下row数据

8. 把option做成可扩展的的数据

9. 把前端的请求地址也做成可扩展的变量 变量的值来值路由地址

10. 在对象里 {[name]: this.query}   [xx]表示键也是个变量

11. 文件上传 需要导入文件处理模块 import { MulterModule } from '@nestjs/platform-express'

12. MulterModule.register({
		  dest: 'uploads' //目录名称
	}),//本地上传模块   会在项目的跟地址自动的创建uploads

13. 使用阿里云oss存储  `cnpm i -S multer-aliyun-oss` 下载oss包  server 文件夹

14. 引入 并配置

###web端

1. 使用nuxtjs 来搭建项目

2. `npx create-nuxt-app <项目名>`

3. 使用vuetify ui 来美化页面 

4. 启动项目npm run dev

5. 在nuxt里 没有路由文件夹 项目的pages文件夹结构就是路由

6. 没有main.js  nuxt.config.js 是主要文件 里面有外部文件的依赖等等  .env为配置环境变量文件

7. 在web 安装 `cnpm i -S @nuxtjs/auth`

``