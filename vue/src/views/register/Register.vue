<template>
   <div class="login_page fillcontain">
    <transition name="form-fade">  
      <section class="form_container" v-show="showLogin">
        <div class="manage_tip">
          <p>欢迎注册</p>
        </div>
        <!-- element-ui 表单 收集数据 json form功能组件 -->
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
           <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名">
            </el-input>
          </el-form-item>
          <el-form-item prop="telephone">
            <el-input v-model="loginForm.telephone" placeholder="手机号">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="密码" type="password">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(loginForm)" class="submit_btn">注册</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
   </div>
</template>

<script>

import customValidator from '@/util/validator'

import { mapActions } from 'vuex'



export default {
  data() {
    return {
      showLogin: false,
      loginForm: {
        username: '',
        telephone: '',
        password: ''
      },
      rules: {
          username: [{required: true, min: 2, max:20, message: '请输入用户名', trigger: 'blur'}],
          telephone: [
            {validator: customValidator.validateTel}
          ],
          password: [
            {
              required: true, min: 6, message: '请输入密码', trigger: 'blur'
            }
          ]
        
      },
     }
  },
  mounted() {
    this.$store.dispatch('show', false)
    this.showLogin = true
  },
  destroyed() {
    this.$store.dispatch('show', true)
  },
  methods: {
    ...mapActions('userModule', {userRegister: 'register'}),
    async submitForm(forName) {
     if (!forName.telephone || !forName.password) {

       return
     }
     this.userRegister(forName).then(() => {
      this.$router.replace({ name: 'Home' })
     }).catch(err => {
      //  console.log(err)
        this.$message({
          showClose: true,
          message: err.message,
          type: 'error'
        });
     })
    }
  
  }
}

</script>

<style lang="stylus" scoped>
.login_page
  height 100vh
  background-color #324057
  display flex
  justify-content center
  align-items center
.manage_tip
  position absolute
  width 100%
  top 100px
  left 0
  p
    font-size 34px
    color #ffffff
.form_container
  width 400px
  height 280px
  box-sizing border-box
  // position absolute
  // top 50%
  // left 50%
  // margin-top -100px
  // margin-left -150px
  padding 25px
  border-radius 5px
  text-align center
  background-color #ffffff
  .submit_btn
    width 100%
    font-size 16px

// 动态产生四个类  
.form-fade-enter-active, .form-fade-leave-active
  // 特效 简单
  transition all 1.5s
// 刚开始的时候  透明度为0  原来opacity 1  设置进入的初始状态
// 进入到真正进入 最后的样式opcity 1 transform translate3d(0, 0, 0)
// 一帧的时间
// form-fade-leave true -> false  默认opcity 1 transform translate3d(0, 0, 0)
// opcity 0 transform translate3d(0, -50px, 0)
.form-fade-enter, .form-fade-leave-active
  // 从上面降下来
  transform translate3d(0, -50px, 0)
  // 不可见
  opacity 0

</style>