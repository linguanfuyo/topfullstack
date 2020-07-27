<template>
  <div class="home">
    <el-menu router class="el-menu-demo headNav d-flex jc-between ai-center" mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    >
    <!-- 图标 -->
    <div class="text-white" style="float: left;">
		<h3>全栈之巅-后台管理</h3>
	</div>
    <!-- 导航 -->
      <div class="hearder">
      <el-menu-item :class="{active1: active === i}" v-for="(item,i) in menu" :key="i" @click="getAsideList(i)"><i class="iconNav" :class="item.icon"></i>{{item.title}}</el-menu-item>
      </div>
    <!-- 用户下拉菜单 -->
    
      <el-dropdown class="">

      <span class="el-dropdown-link">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <div>林观富</div>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><span @click="$router.push('/index/AccountSetting')">修改密码</span></el-dropdown-item>
        <el-dropdown-item><span @click="exit">退出</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    
    
  </el-menu>
    <el-container style="height: 100vh; border: 1px solid #eee">

      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-active="$route.path">
            <template slot="title"><i class="el-icon-message"></i></template>
            <el-menu-item :index="item.path" v-for="(item,i) in menu[active].aside" :key="i">
              {{item.title}}
          </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container style="height: 100vh;">
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>


  export default {
    data(){
      return {
        
         user: {},
         active: 1,
		 menu: [
			 {
				 title: '内容管理',
				 aside: [
					 {title: '首页',path: '/'},
					 {title: '课程管理',path: '/courses/list'},
					 {title: '课时管理',path: '/episodes/list'},
				 ]
			 },
			 {
			 	title: '运营管理',
			 	aside: [
			 		 {title: '用户管理',path: '/users/list'},
			 	]			 
			 }
		 ]
         
      }
    },
    created(){
      //获取第一个侧边栏列表信息
        this.getAsideList(0);

        
    },
    methods: {
    
      getAsideList(index){
         this.active = index;
      },
      async getLoginUser(){
        const res = await this.$http("/api/login/name.do");
        this.user = res.data
      },
      async exit(){
        
        // const res = await this.$http.post('/api/logout')
        this.$router.push('/login')
        //清空-----
      }

    },
  }
</script>

<style>
	
  .hearder {
	  display: flex;
  }
  .active1 {
	
    color: #ffd04b !important;
    border-bottom: 2px solid #ffd04b !important;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-dropdown-link {
    color: #fff;
    display: d-flex;
    align-items: center;
  }

</style>
