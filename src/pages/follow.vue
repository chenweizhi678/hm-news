<template>
  <div class="folllow">
    <hmheader>我的关注</hmheader>
    <div class="list">
      <div class="item" v-for="item in list1" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt />
        </div>
        <div class="center">
          <div class="name">{{ item.nickname }}</div>
          <div class="date">{{ item.create_date | date }}</div>
        </div>
        <div class="right" @click="unfollow(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list1: []
    }
  },
  created() {
    // 通过这个方法去获取列表 这个列表有后台信息
    this.getfollowlist()
  },

  methods: {
    getfollowlist() {
      this.$axios({
        method: 'get',
        url: '/user_follows'
      }).then(res => {
        console.log(res.data)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.list1 = data
          console.log(this.list1)
        }
      })
    },

    async unfollow(id) {
      try {
        //  等待弹窗
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确定取消嘛'
        })

        //  点击确定后 等发送ajax得结果
        const res = await this.$axios({
          method: 'get',
          url: `/user_unfollow/${id}`
        })

        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.$toast.success(message)
          this.getfollowlist()
        }
      } catch {
        this.$toast(' 取消操作啦')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  height: 80px;
  border-bottom: 1px solid #ccc;
  display: flex;
  padding: 10px 10px;
  justify-content: space-between;
  align-items: center;

  .left {
    img {
      width: 40px;
      height: 40px;
      display: block;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    margin-left: 20px;
    .name {
      font-size: 18px;
      color: red;
    }
    .data {
      font-size: 12px;
      color: #999;
    }
  }
  .right {
    background-color: #ddd;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    padding: 0 15px;
    color: #000;
  }
}
</style>
