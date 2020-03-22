<template>
  <div class="edit">
    <hmheader>编辑资料</hmheader>
    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
      <van-uploader class="uploader" :after-read="afterRead" :before-read="beforeRead" />
    </div>
    <!-- 导航条 -->
    <hmnavbar1 title="昵称" :content="info.nickname" @click="shownickname"></hmnavbar1>
    <hmnavbar1 title="密码" :content="info.password.replace(/./g, '*')" @click="showpassword"></hmnavbar1>
    <hmnavbar1 title="性别" :content="info.gender === 1 ? '男' : '女'" @click="showgender"></hmnavbar1>

    <!-- !!!!!! 修改昵称的对话框
    v-model="show" 通过show的值来控制对话框的显示隐藏，用vant 提供的组件 在点击时触发这个给框加上true-->
    <!--  这个组件还提供其他方法 在点击确定按钮时可触发事件发生confirm -->
    <van-dialog v-model="show" title="修改名字" show-cancel-button @confirm="editnickname">
      <!-- 用vant的field输入个框 ,应该显示之前的名字 所以要绑定一个，如果直接使用data里的数据，会立即改变后台的数据，所以使用一个变量来转接-->
      <!-- 思路是在点击的时候将议案数据的值赋值给它 -->
      <van-field v-model="nickname" placeholder="请输入用户名" />
    </van-dialog>

    <!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!修改密码 -->

    <van-dialog v-model="show1" title="修改密码" show-cancel-button @confirm="editpassword">
      <!-- 用vant的field输入个框 ,应该显示之前的名字 所以要绑定一个，如果直接使用data里的数据，会立即改变后台的数据，所以使用一个变量来转接-->
      <!-- 思路是在点击的时候将议案数据的值赋值给它 -->
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>

    <!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!修改性别 要用到Radio 单选框 先在main里映入 -->

    <van-dialog v-model="show2" title="修改性别" show-cancel-button @confirm="editgender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <!-- 给一个遮罩 -->
    <div class="cropper-mask" v-show="showCropper">
      <vue-cropper
        ref="cropper"
        :img="img"
        autoCrop
        :autoCropWidth="150"
        :autoCropHeight="150"
        :fixed="true"
      ></vue-cropper>
      <van-button type="primary" class="croop" @click="fix">裁剪</van-button>
      <van-button type="info" class="cancel" @click="cancel">取消裁剪</van-button>
    </div>
  </div>
</template>

<script>
// ！！！！！图片的裁剪
import { VueCropper } from 'vue-cropper'

export default {
  data() {
    // 为了把从后台拿到的数据存起来
    return {
      showCropper: false,
      info: { password: '' },
      show: false,
      nickname: '',
      show1: false,
      password: '',
      show2: false,
      gender: 1,
      img: ''
    }
  },
  created() {
    // 获取个人信息
    this.getinfo()
  },
  methods: {
    async edituser(data) {
      //  在点击的时候 发送请求(也就需要token信息才可以发)根据接口 data里放你要更改的数据 获取数据成功之后 res之后然后再改数据
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')

      const res = await this.$axios({
        method: 'post',
        url: `/user_update/${user_id}`,
        data: data,
        headers: {
          Authorization: token
        }
      })

      const { statusCode, message } = res.data
      if (statusCode === 200) {
        // 重新渲染
        this.getinfo()
        // 修改成功的提示
        this.$toast.success(message)
      }
    },

    async getinfo() {
      // 发送ajax请求 在发请求的时候必须携带token 这个token在请求头里 authorization 获取个人信息
      // id和token的信息在login事存期来的 直接用在就可以了 token的信息是存在localstorage 后期把token的信息存在Authorization里 每一个页面都需要这个认证信息
      const user_id = localStorage.getItem('user_id')

      const token = localStorage.getItem('token')
      const res = await this.$axios({
        method: 'get',
        url: `/user/${user_id}`
        // 需要携带token认证信息，通过后就可以拿到后台数据
        // headers: {
        //   Authorization: token
        // }
      })

      // console.log(res)
      // 得到后台返回的数据 把它结构出来 并存起来 后面动态熏染
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        data
        this.info = data
        // console.log(data)
      }
    },
    // 在点击时显示修改名程的对话框
    shownickname() {
      this.show = true
      this.nickname = this.info.nickname
    },

    editnickname() {
      // //  在点击的时候 发送请求(也就需要token信息才可以发)根据接口 data里放你要更改的数据 获取数据成功之后 res之后然后再改数据
      // const user_id = localStorage.getItem('user_id')
      // const token = localStorage.getItem('token')

      // this.$axios({
      //   method: 'post',
      //   url: `/user_update/${user_id}`,
      //   data: {
      //     nickname: this.pnickname
      //   },
      //   headers: {
      //     Authorization: token
      //   }
      // }).then(res => {
      //   const { statusCode, message } = res.data
      //   if (statusCode === 200) {
      //     // 重新渲染
      //     this.getinfo()
      //     // 修改成功的提示
      //     this.$toast.success(message)
      //   }
      // })
      this.edituser({ nickname: this.nickname })
    },

    showpassword() {
      this.show1 = true
      this.password = this.info.password
    },

    editpassword() {
      //  在点击的时候 发送请求(也就需要token信息才可以发)根据接口 data里放你要更改的数据 获取数据成功之后 res之后然后再改数据
      // const user_id = localStorage.getItem('user_id')
      // const token = localStorage.getItem('token')

      // this.$axios({
      //   method: 'post',
      //   url: `/user_update/${user_id}`,
      //   data: {
      //     password: this.password
      //   },
      //   headers: {
      //     Authorization: token
      //   }
      // }).then(res => {
      //   const { statusCode, message } = res.data
      //   if (statusCode === 200) {
      //     // 重新渲染
      //     this.getinfo()
      //     // 修改成功的提示
      //     this.$toast.success(message)
      //   }
      // })
      this.edituser({ password: this.password })
    },

    showgender() {
      this.show2 = true
      this.gender = this.info.gender
    },
    editgender() {
      this.edituser({ gender: this.gender })
    },

    afterRead(file) {
      // 读取完文件应该，就要显示裁剪的页面
      // console.log('上传文件', file)
      this.showCropper = true

      this.img = file.content

      // // 在选择文件之后会到一个图片的信息 在file。file里
      // // console.log('上传文件', file)
      // // 上传文件用formdata

      // const fd = new FormData()
      // // 先吧数据从file.file里拿出来，放到后台要求的file里面
      // fd.append('file', file.file)
      // this.$axios({
      //   method: 'post',
      //   url: '/upload',
      //   data: fd,
      //   headers: {
      //     Authorization: localStorage.getItem('token')
      //   }
      // }).then(res => {
      //   // console.log(res.data)
      //   // 成功后需要把地址给img 拿到的只是地址
      //   const { statusCode, data } = res.data
      //   if (statusCode === 200) {
      //     // 能够拿到上传的图片的地址了，还需要修改掉用户的头像
      //     // console.log(data.url)
      //     this.edituser({
      //       head_img: data.url
      //     })
      //   }
      // })
    },

    beforeRead(file) {
      // if (file.type !== 'image/jpeg') {
      //   this.$toast('请上传 jpg 格式图片')
      //   return false
      // }
      // return true
      if (file.size / 1024 >= 200) {
        this.$toast.fail('文件大小不合规')
        return false
      }
      // console.log(123)

      return true
    },
    cancel() {
      this.showCropper = false
      this.img = ''
    },
    fix() {
      this.$refs.cropper.getCropBlob(async data => {
        // 拿到了剪裁后的文件，需要对他上传
        console.log(data)
        const fd = new FormData()
        // 先吧数据从file.file里拿出来，放到后台要求的file里面
        fd.append('file', data)
        const res = await this.$axios({
          method: 'post',
          url: '/upload',
          data: fd,
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        // console.log(res.data)
        // 成功后需要把地址给img 拿到的只是地址
        // 因为使用了async 并且const定义变量是不能重复的  使用解构重命名来解决
        const { statusCode, data: data1 } = res.data
        if (statusCode === 200) {
          // 能够拿到上传的图片的地址了，还需要修改掉用户的头像
          // console.log(data.url)
          this.edituser({
            head_img: data.url
          })
          this.showCropper = false
          this.img = ''
        }
      })
    }
  },

  // 剪裁组件
  components: {
    VueCropper
  }
}
</script>

<style lang="less" scoped>
.avatar {
  position: relative;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: block;
    margin: 30px auto;
  }

  .uploader {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
}

.cropper-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
  top: 0;
  left: 0;
}

.croop {
  position: absolute;
  top: 0;
  left: 0;
}

.cancel {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
