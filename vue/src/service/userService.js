import request from './request'

// 用户登陆
const login = ({telephone,password}) => {
  return request.post('auth/login',{telephone,password})
}

// 用户注册
const register = ({username,telephone, password}) => {
  return request.post('auth/register', {username,telephone, password})
}

// 用户信息
const info = () => {
  return request.get('auth/info')
}

export default  {
  login,
  register,
  info
}