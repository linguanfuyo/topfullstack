# topfullstack

图片看不了，最下面原文档连接哦

### 预览

[用户端预览地址](http://linfufuu.top)

[管理端预览地址](http://linfufuu.top/admin)

#### 用户端账号密码

账号：admin

密码：123456

#### 管理后台账号密码

> 管理后台仓库地址 https://gitee.com/linguanfu/sky-admin-vue

账号：admin

密码：admin

### 一、介绍

全栈开发-视频分享网站

技术栈：`Nestjs`+`Nuxt`+`TS`

数据库：`Mongodb `+ `Redis`

项目 UI： `Vuetify` 和 `ant-design-vue`

> `Vuetify`的 `UI` 实在太少了。又懒得改，所以就按需导入了`ant-design-vue`

### 二、项目架构

项目包括：

- 用户视频网站
- 用户网站和管理后台的服务端 `API` 项目（[管理后台](https://gitee.com/linguanfu/sky-admin-vue) 源码在`sky-admin-vue`仓库）

### 三、启动项目

- [x] 给 web 端和 serve 端分别安装项目依赖`npm i`

- [x] 先启动 `mongoDB` 数据库： `mongod --storageEngine mmapv1 -dbpath d:\E\mongoData`（手动启动，`mongoDB` 数据库是自动启动的跳过）

- [x] 启动 `redis`(本项目 `redis` 部署在服务器上)，目前 redis 只用与短信登录功能

- [x] 启动 server 端项目： 进入 server 文件夹 启动子项目 `nest start -w web`

- [x] 启动 web（Nuxt）项目: `npm run dev`

### 四、项目构建与开发细节

#### 4.1、前提

请确保您的操作系统上安装了 `Node.js（>= 10.13.0）`。

命令行输入 `npm -v` 查看本地的 `node`版本

#### 4.2、创建 Nest 项目

安装`nestjs`脚手架创建和管理项目

```
npm i -g @nestjs/cli
```

> i 为 install 的简写 -g 表示安装到全局 -s 表示只安装到本项目 -d 表示只安装到项目的开发依赖中

使用脚手架创建 nest 项目

```
nest new project-name
```

##### 项目结构

```
src
|_ app.controller.ts # 控制器
|_ app.service.ts # 服务
|_ app.module.ts # 根模块
|_ main.ts  # 项目入口，可以选择平台、配置中间件等
node_modules # 依赖
nest-cli.json
package.json # 项目配置文件
tsconfig.json # ts配置
tslint.json # tslint配置
```

#### 4.3、创建 Nuxt 项目

创建项目

```
npx create-nuxt-app <项目名>
```

启动项目

```
npm run dev
```

##### 项目结构

```
└─my-nuxt-demo          // 项目文件夹
  ├─.nuxt               // Nuxt自动生成，临时的用于编辑的文件，build
  ├─assets              //  用于存放静态资源文件对于不需要通过 Webpack 处理的静态资源文件，可以放置在 static 目录中
  ├─components          // 用于存放组件
  ├─layouts             // 布局目录，用于组织应用的布局组件，不可更改⭐
  ├─middleware          // 用于存放中间件
  ├─node_modules
  ├─pages               // 用于存放页面,Nuxt.js根据该目录结构自动生成对应的路由配置，文件名不可更改⭐
  ├─plugins             // 用于组织那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件（axios）。
  ├─static              // 用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理。 服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下。文件夹名不可更改。⭐
  ├─store               // 用于组织应用的Vuex 状态管理。文件夹名不可更改。⭐
  ├─.editorconfig       // 开发工具格式配置
  ├─.eslintrc.js        // ESLint的配置文件，用于检查代码格式
  ├─.gitignore          // 配置git忽略文件
  ├─nuxt.config.js      // 用于组织Nuxt.js 应用的个性化配置，以便覆盖默认配置。文件名不可更改。⭐
  ├─package-lock.json   // npm自动生成，用于帮助package的统一设置的，yarn也有相同的操作
  ├─package.json        // npm 包管理配置文件
  ├─README.md

```

#### 4.4、基本命令

##### npm 常用命令

- `npm install -s|d|g xxx（包名）` 安装、更新依赖

- `npm uninstall xxx` 删除对应的依赖包

- `npm -v` 查看 `npm` 版本

- `npm list` 查看当前项目的依赖列表

- `npm -g|s|d outdated` 查看可更新的包列表

使用脚手架创建 nest 项目
`nest new project-name`

##### nest 基本命令

| 命令                 | 缩写          | 描述                                                               |
| -------------------- | ------------- | ------------------------------------------------------------------ |
| nest new xxx         | nest n xxx    | 创建项目                                                           |
| nest generate co xxx | nest g co xxx | 创建或修改对应的文件                                               |
| nest build           | -             | 打包程序。                                                         |
| nest start           | -             | 启动默认程序                                                       |
| nest start -w xxx    | -             | 启动子项目。                                                       |
| nest add             | -             | 导入已打包为 nest 的库，运行其安装示意图。                         |
| nest update          | nest u        | 更新包中的 @nestjs package.json dependencies 列表的 @latest 版本。 |
| nest info            | nest i        | 现实已安装的 nest 包和其他有用的系统信息。                         |

### 五、打包部署

#### 5.1、前提

- [x] 购买服务器
- [x] 购买域名
- [x] 解析域名
- [x] 开启所用到的端口 3000（`nest`）、6868（`redis`），注意端口冲突。
- [x] 使用宝塔面板服务器安装运行环境（前提安装在服务器上宝塔面板）
  - 全局安装`PM2`
  - 安装`MongoDB`，并创建`topfullstack`数据库。
  - 安装`Redis`
  - 安装`Nginx`
- [x] 使用域名创建网站

**参考 1：**
![image](84EEDF260D554013A2223DF6F80B74FA)
**参考 2：**
![image](E81F95CF5FF54F55AF152307C981BBA1)
**参考 3：**
![image](8CE44386F0F145F7AA9CBBC1DC559DFB)

#### 5.2、打包 Nest 项目

1. 配置项目启动端口

```
...

const PORT = 3000
await app.listen(PORT);

...
```

2. 运行打包命令（生成 dist 文件夹）

```
npm run build
```

3. 将`Nest`项目拉取到服务器上（除开`node_modules`文件，打开项目所在目录的命令行，安装项目依赖。

```
npm i
```

4. 使用`PM2`启动`Nest`项目
   ![image](91B08EBB05DC4694921A2A6722C7FE6E)

至此，`Nest`项目已经正常启动了。

#### 5.3、打包 Nuxt 项目

1. 配置请求 URL

```
BASE_URL=http://linfufuu.top/api
API_URL = http://linfufuu.top/api

```

2. 打包项目（打包静态应用）

```
npm run generate
```

3. 把生成的静态资源，放到上面网站的目录中。至此，输入网站域名，就可以访问到网站了。

4. 配置`Nginx`代理

```
location /api/ {
	      proxy_pass http://127.0.0.1:3000;
}
```

把带有`/api/`的请求代理到服务器本地。

![image](7B54E6BB274945D4B7524A9090F2D51A)

至此，已经可以发送请求了。

#### 5.4、打包管理后台项目

1. 修改环境配置

```
VITE_GLOB_API_URL=http://linfufuu.top/api
```

2. 打包项目

```
yarn build
```

3. 在网站根目录，新建 admin 文件夹，把生成的静态文件放到 admin 文件夹内（避免与用户端访问冲突），如果访问不到图片、css 等静态资源，则将除 index.html 文件外的其他资源，放到网站的根目录上。

**参考 4：**
![image](44AD79A001F94BA3A8C0DAB06F9E916E)

#### 5.5、迁移本地数据库资源

1. 进入本地 Nest 项目，在项目的根目录上生成打包数据 dump 文件夹

```
mongodump -d 数据库名称
```

2. 将生成的 dump 文件夹，放到服务器上，并执行以下命令。

```
mongorestore
```

**参考 5：**
![image](B4B1CF414301426EB44E0309E83796D7)

至此，数据已经迁移过来了。

### 最后

> 自己捣鼓的项目，bug 挺多的，往见谅 ❥(^\_-)

文档：星空项目.md

链接：http://note.youdao.com/noteshare?id=7766b7b92a04f145601a809369263f3e
