<template>
  <div class="login">
    <hmheader>登录</hmheader>

    <hmlogo></hmlogo>
    <hminput
      type="text"
      placeholder="用户名"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名格式不对"
      ref="username"
    ></hminput>

    <hminput
      type="password"
      placeholder="请输入密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="用户密码格式错误"
      ref="password"
    ></hminput>

    <hmbutton @chufafuji="login">登录</hmbutton>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      // console.log('登录')
      // console.log(axios)

      // 应该先校验之后 通过后才可以再发请求
      const r1 = this.$refs.username.validate(this.username)
      const r2 = this.$refs.password.validate(this.password)
      if (!r1) {
        return
      }

      if (!r2) {
        return
      }

      this.$axios({
        method: 'post',
        url: '/login',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        console.log(res)
        if (res.data.statusCode === 200) {
          this.$toast.success('成功')
          // 如果登录成功了，需要跳转到个人中心
          this.$router.push('/user')
        } else {
          this.$toast.fail('用户名或者密码错误')
        }
      })
    }
  },

  data() {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style></style>
