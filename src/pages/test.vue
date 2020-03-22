<template>
  <div class="test">
    <vue-cropper
     ref="cropper"
      img=https://p1.pstatp.com/large/2dd480000fa3badbd6de7
      :info="true"
      autoCrop
      :autoCropWidth="150"
      :autoCropHeight="150"
      :fixed="true"
      :fixedNumber="[1,1]"
    >
    </vue-cropper>

    <van-button  type="primary"  class="croop" @click="crop" >裁剪</van-button>
  </div>
</template>

<script>
// 组件内使用
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  methods:{
    crop(){
      // 获取裁剪图片的信息 传图片就是传这个blob文件，这个文件传到服务器，再该头像
      this.$refs.cropper.getCropBlob((data) => {
     // do something
     console.log(data)  
     })

    }


  }
}
</script>

<style lang="less" scoped>
.test {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.croop{
  position: absolute;
  top: 0;
  left: 0;

}
</style>
