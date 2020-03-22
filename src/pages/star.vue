<template>
  <div class="star">
    <hmheader>我的收藏</hmheader>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="info">
          <div class="title">{{item.title}}</div>
          <div class="buttom">
            <span>{{item.user.nickname}}</span>
            <span>{{item.comments.length}}</span>
          </div>
        </div>
        <img :src="item.cover[0].url" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 发请求拿数据 进行渲染
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getlist()
  },

  methods: {
    async getlist() {
      const res = await this.$axios.get('/user_star')
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  padding: 10px;
  justify-content: space-between;
  border-bottom: 1px solid #000;
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 16px;
    }
    .buttom {
      font-size: 12px;
      color: #999;
      span {
        padding: 5px;
      }
    }
  }
  img {
    width: 120px;
    height: 60px;
    display: block;
    object-fit: cover;
  }
}
</style> 