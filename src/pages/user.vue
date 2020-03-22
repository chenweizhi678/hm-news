<template>
  <div class="user">
    <hmheader>个人中心</hmheader>
    <!-- 整个上部分 -->
    <div class="info" @click="$router.push('/edit')">
      <!-- 头像 -->
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt />
      </div>

      <!-- 时间和性别 -->
      <div class="center">
        <div class="name">
          <span v-if="info.gender === 1" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span>{{ info.nickname }}</span>
        </div>
        <div class="time">{{ info.create_date | date }}</div>
      </div>

      <!-- 右边箭头 -->
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>

    <hmnavbar1 title="我的关注" content="关注的用户" @click="$router.push('/follow')"></hmnavbar1>
    <hmnavbar1 title="我的跟帖" @click="$router.push('/comments')" content="回复"></hmnavbar1>
    <hmnavbar1 title="我的收藏" @click="$router.push('/star')" content="文章"></hmnavbar1>
    <hmnavbar1 title="设置" @click="$router.push('/edit')"></hmnavbar1>
    <hmnavbar1 title="退出" @click="logout"></hmnavbar1>
  </div>
</template>

<script>
export default {
  // 通过token获取了数据 需要先存起来
  data() {
    return {
      info: {}
    }
  },
  // 父传子
  methods: {
    async logout() {
      // console.log('退出')
      try {
        const res = await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要退出本系统吗'
        })

        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        this.$router.push('/login')
        this.$toast.success('推出成功')
      } catch {
        // 点击取消
        this.$toast('quxiao')
      }
    }
  },
  // 到了这个页面需要发请求获取数据
  async created() {
    // 请求获取数据
    //在发送请求的时候，携带token
    // token需要通过一个请求头才可以
    const user_id = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')

    const res = await this.$axios({
      method: 'get',
      url: `/user/${user_id}`,
      headers: {
        Authorization: token
      }
    })

    // console.log(res)
    // 结构状态码
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.info = data
      // console.log(this.info)
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  .info {
    // 给父级flex布局
    height: 90px;
    display: flex;
    border-bottom: 3px solid #ccc;
    //  flex布局的center
    align-items: center;

    .left {
      width: 70px;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        text-align: center;
      }
    }

    .center {
      padding-left: 20px;
      flex: 1;
      .name {
        span {
          font-size: 18px;
        }
      }

      .time {
        font-size: 16px;
        color: #999;
      }
    }

    .right {
      width: 30px;
      text-align: right;
    }

    .iconxingbienv {
      color: pink;
    }

    .iconxingbienan {
      color: blue;
    }
  }
}
</style>
