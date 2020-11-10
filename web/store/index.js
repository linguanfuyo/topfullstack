
export const state = () => ({
    auth:{},
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