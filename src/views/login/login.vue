<template>
  <div class="container">
    <div class="login-box">
      <div class="title">管理后台登录</div>
      <el-input v-model="user_id" placeholder="账号"></el-input>
      <el-input v-model="password" placeholder="密码"></el-input>
      <el-button type="primary"
                 style="width:100%"
                 :disabled="!user_id || !password"
                 @click="login">登录</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .login-box {
    width: 400px;
    .title {
      height: 50px;
      line-height: 50px;
      text-align: center;
      margin-bottom: 20px;
      font-size: 28px;
    }
    .el-input {
      margin-bottom: 12px;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      user_id: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$api.login({user_id: this.user_id, password: this.password}).then((data) => {
        if (data.code === 'S_OK') {
            localStorage.setItem('token', data.token)
            this.$message({
            type: 'success',
            message: '登录成功'
          })
          this.$router.push('/')
        } else {
            this.$message({
            type: 'warning',
            message: '账号或者密码错误'
          })
        }
      }, (error) => {
        console.log(error)
      })
    }
  }
}
</script>