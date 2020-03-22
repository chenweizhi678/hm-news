<template>
  <div class="comments">
    <hmheader>我的跟帖</hmheader>
    <div class="list">
      <van-list
        @load="onLoad"
        :immediate-check="false"
        :offset="50"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了 亲"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <div class="time">{{ item.create_date | date('YYYY-MM-DD HH:mm') }}</div>
          <!--   父级pin'l -->
          <div class="parent-comment" v-if="item.parent">
            <div class="parent-name">{{ item.parent.user.nickname }}</div>
            <div class="parent-content">{{ item.parent.content }}</div>
          </div>
          <div class="cotent">{{ item.content }}</div>
          <div class="link">
            <div class="title one-txt-cut">{{ item.post.title }}</div>
            <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 10
    }
  },
  created() {
    this.commentlist()
  },
  methods: {
    onLoad() {
      console.log('到底了，需要加载更多数据')
      // 因为到底了需要加载更多数据 所以需要请求数据

      // 页码加一 重新发请求
      setTimeout(() => {
        this.pageIndex++
        this.commentlist()
      }, 1000)
    },
    // 用于获取评论数据列表
    async commentlist() {
      const res = await this.$axios({
        method: 'get',
        url: '/user_comments',
        params: {
          pageIndex: this.pageIndex,

          pageSize: this.pageSize
        }
      })

      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // 因为在原有页面上加数据 所以需要是加上之前得
        this.list = [...this.list, ...data]
        this.loading = false
        console.log(this.list)

        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  border-bottom: solid 1px #ccc;
  padding: 10px;
  .time {
    font-size: 14px;
    color: #999;
    height: 30px;
    line-height: 30px;
  }

  .content {
    font-size: 18px;
  }
  .link {
    color: #999;
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    justify-content: space-between;
    .title {
      flex: 1;
    }
    span {
      width: 40px;
      text-align: right;
    }
  }

  .parent-comment {
    background-color: #ddd;
    padding: 10px;
    font-size: 14px;
    color: #999;
  }
}
</style>
