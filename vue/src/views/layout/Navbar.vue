<template>
  <div class="head">
    
      <el-row>
        <el-col :span="5"><div class="left">ZioGie</div></el-col>
        <el-col :span="14">
          <div>aa</div>
        </el-col>
        <el-col :span="5">
          <div class="right" v-if="userInfo">
            <el-dropdown >
            <span class="el-dropdown-link">
              {{userInfo.username}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$router.push({name: 'Profile'})">个人主页</el-dropdown-item>
              <el-dropdown-item divided  @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </div>
          <div class="right" v-else>
            <span @click="$router.push({name: 'Login'})">登陆</span>
            <span @click="$router.push({name: 'Register'})">注册</span>
          </div>
        </el-col>
      </el-row>
  
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {

    }
  },
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo
  }),
  methods: mapActions('userModule', ['logout'])
  
 
}
</script>

<style lang="stylus" scoped>
.head
  width 100%
  background-color rgb(41,42,45)
  height 50px
  line-height 50px
  justify-content space-between
  box-shadow: 0 3px 3px rgba(100, 100, 100, .3)
  position fixed
  top 0
  left 0
  right 0
 
  .left,.right
    text-align center
  .right
    span
      margin-right 10px
      cursor pointer
 
</style>

