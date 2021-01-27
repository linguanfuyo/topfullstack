export default ({
    app
  }) => {
    app.router.beforeEach((to, from, next) => {
      // 判断是否有权限
      next()
      console.log(1)
    })
  }