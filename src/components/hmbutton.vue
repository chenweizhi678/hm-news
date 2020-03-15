<template>
  <div class="hm-button" @click="clickfn">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    clickfn() {
      this.$emit('chufafuji')
    }
  }
}
</script>

<style>
.hm-button {
  margin: 20px;
  height: 50px;
  line-height: 50px;
  width: 320px;
  color: #fff;
  background-color: red;
  border-radius: 25px;
  text-align: center;
  font-size: 18px;
}
</style>
