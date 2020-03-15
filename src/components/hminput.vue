<template>
  <div class="hm-input">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="inputFn"
      :class="{ success: status === 'success', error: status === 'error' }"
    />
    <!-- 放提示消息 -->
    <!-- <div class="tips">用户名错误</div> -->
    <div class="tips" v-show="status === 'error'">{{ message }}</div>
  </div>
</template>

<script>
export default {
  // 接受父级页面传来的数据
  props: {
    type: {
      type: String,
      default: 'text'
    },

    placeholder: {
      type: String,
      default: ' 请输入'
    },

    value: String,

    rule: RegExp,
    message: String
  },

  data() {
    return {
      // 记录表单的校验状态的
      status: ''
    }
  },
  methods: {
    inputFn(e) {
      let value = e.target.value
      this.$emit('input', e.target.value)
      this.validate(value)
    },

    // 对表单进行校验 单独提供一个方法 方便在登录前校验
    validate(value) {
      // 添加表单校验
      if (this.rule) {
        // 判断value值是否符合传入 的正则
        if (this.rule.test(value)) {
          this.status = 'success'
          return true
        } else {
          this.status = 'error'
          return false
        }
        console.log(this.status)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.hm-input {
  height: 50px;
  margin: 0 10px;
  input {
    height: 30px;
    line-height: 30px;
    border: none;
    border-bottom: 1px solid #ccc;
    width: 100%;
    font-size: 16px;

    &.success {
      border-color: green;
    }

    &.error {
      border-color: red;
    }
  }

  .tips {
    color: red;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }
}
</style>
