<template>
  <div class="hm-navbar" @click="clickfn">
    <div class="left">{{title}}</div>
    <div class="center">{{content}}</div>
    <div class="right">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    content: String
  },

  methods: {
    clickfn() {
      // console.log('tuichu')
      // 当点击navbar   触发click事件
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.hm-navbar {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  margin-left: 20px;
  font-size: 15px;
  //   均分空间
  justify-content: space-between;

  .center {
    flex: 1;
    text-align: right;
  }
  .right {
    width: 30px;
  }
}
</style>