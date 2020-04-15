import storageService from '@/service/storageService'
import userService from '@/service/userService'

const userModule = {
  namespaced: true,
  state: {
    token: storageService.get(storageService.USER_TOKEN),
    userInfo: storageService.get(storageService.USER_INFO) ? JSON.parse(storageService.get(storageService.USER_INFO)) : null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      // 更新本地缓存
      storageService.set(storageService.USER_TOKEN,token)
      // 跟新state
      state.token = token
    },
    SET_USERINFO(state, userInfo) {
      // 更新本地缓存
      storageService.set(storageService.USER_INFO, JSON.stringify(userInfo))
      // 更新state
      state.userInfo = userInfo
    }
  },
  actions: {
    login(ctx, {telephone,password}) {
      return new Promise((resolve, reject) => {
        userService.login({telephone, password}).then(res => {
          console.log(res)
          // 保存token
          ctx.commit('SET_TOKEN', res.data.token)
          return userService.info()
        }).then(res => {
          console.log(res)
          ctx.commit('SET_USERINFO', res.data.user)
          resolve(res)
        }).catch((err) => {
          // console.log(err)
          reject(err)
        })
      })
    },
    register(ctx, {username,telephone,password}) {
      return new Promise((resolve, reject) => {
        userService.register({username,telephone,password}).then(res => {
          console.log(res)
          // 保存token
          ctx.commit('SET_TOKEN', res.data.token)
          return userService.info()
        }).then(res => {
          console.log(res)
          ctx.commit('SET_USERINFO', res.data.user)
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    logout(ctx) {
      ctx.commit('SET_TOKEN','')
      ctx.commit('SET_USERINFO','')
      // 刷新页面
      window.location.reload()
    }
  }
}

export default userModule