import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
// import CoursesList from '../views/courses/CourseList.vue'
// import CoursesEdit from '../views/courses/CourseEdit.vue'
import ResourceCrud from '../views/ResourceCrud.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: '内容管理',
    component: Main,
	redirect: '/',
	children: [
		{name: '首页',path: '/',component: Home},
		{name: '课程管理',path: '/:resource/list',component: ResourceCrud,props: true},
		// {name: '课程管理',path: '/courses/list',component: CoursesList},
		// {name: '课程编辑',path: '/courses/edit/:id',component: CoursesEdit,props: true},
		// {name: '课程创建',path: '/courses/create',component: CoursesEdit},
		{name: '课时管理',path: '/episode',component: Home}
	]
  },
  
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
