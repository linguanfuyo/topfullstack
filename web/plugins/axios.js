export default function ({ $axios, redirect }) {
    $axios.onError(error => {
        console.log(error)
        // 没有权限这跳转到登录页面
        if(error.response.status === 401) {
            this.$message.error({
                content: '登录过期'
              })
            redirect('/login')
        }
        // if(error.response.status === 500) {
        //     redirect('/')
        // }
    })
    // 请求拦截器
    $axios.onRequest(config => {
        try {
            // 给请求头带上token
            if (process.client) {
                const storage = window.localStorage
                const token = storage.getItem('auth._token.local')
                if(token){
                    $axios.setHeader('Authorization', token)
                 }
        }
        } catch (error) {
            console.log(error)
        }
        
    })

    // 响应拦截器  可拦截登录过期信息 跳转到登录也
    $axios.onResponse(response => {


    })
  }
