<template>
  <div class="error_page">
    <div class="error_info">
      <img :src="error.statusCode === 404 ? '/image/404.png' : '/image/500.png'" alt="error" />
      <a-button type="primary" ghost @click="returnPage">返回首页</a-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'errorPage',
  layout: 'logoLayout',
  props: {
    error: {
      type: Object,
      require: false,
      default: () => {}
    }
  },
  head() {
    return {
      title: this.error.statusCode === 404 ? '404页面不存在' : '服务器异常',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.error.statusCode === 404 ? '404页面不存在' : '服务器异常'
        }
      ]
    }
  },
  methods: {
    returnPage() {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="less" scoped>
.error_page {
  width: 100%;
  height: 100vh;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  .error_info {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 600px;
    height: 500px;
    button {
      width: 150px;
      color: #1b1c1d;
      border-color: #232425;
      &:hover {
        color: #40a9ff;
        background-color: transparent;
        border-color: #40a9ff;
      }
      &:focus {
        color: #40a9ff;
        background-color: transparent;
        border-color: #40a9ff;
      }
    }
  }
}
</style>
