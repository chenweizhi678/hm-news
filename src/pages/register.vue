<template>
  <div class="register">
    <hmheader>注册</hmheader>
    <hmlogo></hmlogo>
    <hminput
      placeholder="用户名/手机号码"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名格式不对"
      ref="username"
    ></hminput>

    <hminput
      placeholder="密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="用户密码格式错误"
      ref="password"
    ></hminput>

    <!--对中文校验  -->
    <hminput
      placeholder="昵称"
      v-model="nickname"
      :rule="/^[\u4e00-\u9fa5]{3,7}$/"
      message="用户的昵称必须是3-7位的中文"
      ref="nickname"
    ></hminput>

    <!-- 按钮 -->

    <hmbutton @chufafuji="register">注册</hmbutton>

    <div class="go-register">
      有账号
      <router-link class="link" to="/login">登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      nickname: ''
    }
  },
  methods: {
    register() {
      // 进下表单校验

      const res1 = this.$refs.username.validate(this.username)
      const res2 = this.$refs.password.validate(this.password)
      const res3 = this.$refs.nickname.validate(this.nickname)
      if (!res1 || !res2 || !res3) {
        return
      }
      // 只有全ture才发请求
      console.log('发请求')
      this.$axios({
        method: 'post',
        url: '/register',
        data: {
          username: this.username,
          password: this.password,
          nickname: this.nickname
        }
      }).then(res => {
        console.log(res.data)

        if (res.data.statusCode === 200) {
          // 显示提示的登录框
          this.$toast.success(res.data.message)
          // 登录成功跳转到首页,
          this.$router.push({
            name: 'login',
            params: { username: this.username, password: this.password }
          })
        } else {
          this.$toast.fail(res.data.message)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.go-register {
  padding: 0 20px;
  font-size: 18px;
  text-align: right;
}
</style>
