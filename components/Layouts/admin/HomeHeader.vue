<template>
  <div class="container" :style="{ width: boxWidth }">
    <a-icon class="trigger" :type="collapse ? 'menu-unfold' : 'menu-fold'" @click="collapsed" />
    <div class="tools">
      <div><a-icon type="ie" style="font-size: 17px; padding-right: 5px" /><a href="/" target="_blank" style="color: rgba(0, 0, 0, 0.65)">返回网站</a></div>
      <div><img src="/logo.png" /><span>admin</span></div>
      <div><a-icon type="poweroff" /><span @click="off">退出系统</span></div>
    </div>
  </div>
</template>
<script>
import Cookie from 'js-cookie'
export default {
  name: 'Header',
  data() {
    return {
      collapse: false,
      boxWidth: 'calc(100% - 200px)'
    }
  },
  methods: {
    collapsed() {
      this.collapse = !this.collapse
      this.$emit('callback', this.collapse)
      if (this.collapse) {
        this.boxWidth = 'calc(100% - 80px)'
      } else {
        this.boxWidth = 'calc(100% - 200px)'
      }
    },
    off() {
      const _this = this
      const modal = this.$confirm({
        title: '温馨提示',
        content: '是否确认退出系统?',
        centered: true,
        cancelText: '取消',
        okText: '确定',
        onOk() {
          Cookie.remove('userInfo')
          modal.destroy()
          _this.$router.push('/admin/login.html')
        },
        onCancel() {}
      })
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        this.clicked = to.path
      },
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  box-sizing: border-box;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  background: #fff;
  z-index: 10000;
  box-shadow: 0 0 1px 0px;
  padding-right: 60px;

  .trigger {
    display: inline-block;
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
  .tools {
    display: flex;
    justify-content: space-between;
    div {
      margin: 0px 10px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50px;
        border: 1px solid #eee;
        background-color: #0066ff;
      }
      span {
        padding-left: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
