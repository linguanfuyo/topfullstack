import { Base64 } from 'js-base64';
if (process.client) {
  const storage = window.localStorage
  if(storage.getItem('user')){
    var temp = JSON.parse(Base64.decode(storage.getItem('user')));
  }
  console.log(temp)
}

export const state = () => ({
    auth:{
      user: temp
    },
    isSyncCount: false, // 是否同步了用户
    isLogin: false,  // 是否登录
    isShowReport: false, // 是否显示举报modal
    reportType: 'User' // 举报类型 
  })
export const mutations = {
    setUser(state,user){
      state.auth.user = user
    },
    setVal(state, {
        valName,
        val
      }) {
        state[valName] = val
      },
      setVals(state, values = {}) {
        Object.keys(values).forEach(key => {
          state[key] = values[key]
        })
      },
      resetUser({
        user
      }) {
        user = {}
      }
}

export const actions={
  setVal({
    commit
  }, {
    valName,
    val
  }) {
    commit('setVal', {
      valName,
      val
    })
  },
  setVals(
    //
    {
      commit
    },
    values
  ) {
    commit('setVals',
      values
    )
  },
  resetUser({
    commit
  }) {
    commit('resetUser')
  }
}