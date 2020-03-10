import { login, logout, getInfo,logintoken,getInfobytoken } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      logintoken({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        console.log(data);
        console.log(data.data.address);
        commit('SET_TOKEN', data.data.token)
        //commit('SET_TOKEN', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODM3NTA1MDAsInN1YiI6IntcIm5hbWVcIjpcIm5hbWVcIixcInVzZXJJZFwiOlwidXNlcmlkXCJ9IiwiaXNzIjoieGlleGllIiwiYXVkIjoiSGVsbG8gV29ybGQiLCJleHAiOjE1ODM4MzY5MDAsIm5iZiI6MTU4Mzc1MDUwMH0.doqRs9WxLQkuvtmpIoAA6ecUKcBZcszsz2LIKYJF3KU")
        setToken(data.token)
        //setToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODM3NTA1MDAsInN1YiI6IntcIm5hbWVcIjpcIm5hbWVcIixcInVzZXJJZFwiOlwidXNlcmlkXCJ9IiwiaXNzIjoieGlleGllIiwiYXVkIjoiSGVsbG8gV29ybGQiLCJleHAiOjE1ODM4MzY5MDAsIm5iZiI6MTU4Mzc1MDUwMH0.doqRs9WxLQkuvtmpIoAA6ecUKcBZcszsz2LIKYJF3KU")
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  //eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODM3NTA1MDAsInN1YiI6IntcIm5hbWVcIjpcIm5hbWVcIixcInVzZXJJZFwiOlwidXNlcmlkXCJ9IiwiaXNzIjoieGlleGllIiwiYXVkIjoiSGVsbG8gV29ybGQiLCJleHAiOjE1ODM4MzY5MDAsIm5iZiI6MTU4Mzc1MDUwMH0.doqRs9WxLQkuvtmpIoAA6ecUKcBZcszsz2LIKYJF3KU
  // {iat=1583750500, sub={"name":"name","userId":"userid"}, iss=xiexie, aud=Hello World, exp=1583836900, nbf=1583750500}
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfobytoken(state.token).then(response => {
        console.log(state.token);
        console.log(response);
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        console.log(data.data.name);
        const { name, userId } = data.data
        console.log(name)
        commit('SET_NAME', name.name)
        commit('SET_AVATAR', "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif")
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

