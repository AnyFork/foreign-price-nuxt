<template>
  <div class="container">
    <div class="nav">
      <a href="/" class="nav-link">
        <img src="/cnyrate.gif" />
      </a>
      <div class="nav-menu">
        <nuxt-link to="/" :class="clicked == '/' ? 'curr' : ''">中国银行</nuxt-link>
        <nuxt-link to="/icbc.html" :class="clicked == '/icbc.html' ? 'curr' : ''">工商银行</nuxt-link>
        <nuxt-link to="/abc.html" :class="clicked == '/abc.html' ? 'curr' : ''">农业银行</nuxt-link>
        <nuxt-link to="/ccb.html" :class="clicked == '/ccb.html' ? 'curr' : ''">建设银行</nuxt-link>
        <nuxt-link to="/cmm.html" :class="clicked == '/cmm.html' ? 'curr' : ''">交通银行</nuxt-link>
        <nuxt-link to="/cmb.html" :class="clicked == '/cmb.html' ? 'curr' : ''">招商银行</nuxt-link>
        <nuxt-link to="/ceb.html" :class="clicked == '/ceb.html' ? 'curr' : ''">光大银行</nuxt-link>
        <nuxt-link to="/eci.html" :class="clicked == '/eci.html' ? 'curr' : ''">中信银行</nuxt-link>
        <nuxt-link to="/cib.html" :class="clicked == '/cib.html' ? 'curr' : ''">兴业银行</nuxt-link>
        <nuxt-link to="/spdb.html" :class="clicked == '/spdb.html' ? 'curr' : ''">浦发银行</nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      clicked: ''
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
  width: 100%;
  height: 80px;
  background-color: @header-bg-color;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 16px;
  border: 1px solid #eee;
  position: fixed;
  top: 0px;
  z-index: 100;
  .nav {
    max-width: 1180px;
    margin: 0px auto;
    display: flex;
    align-items: center;
    height: 100%;
    .nav-link {
      display: flex;
      font-weight: 600;
      align-items: center;
      height: 100%;
      margin-bottom: 7px;
      &:hover {
        background-color: transparent !important;
      }
      h2 {
        font-size: 16px;
        display: flex;
        color: #fff;
        padding-left: 15px;
        align-items: center;
        margin: 0px;
      }
      &:hover {
        background-color: @header-hover-color;
      }
    }
    .nav-menu {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      align-items: center;
      height: 100%;
      a {
        display: flex;
        color: #2b3c4e;
        line-height: 1.5;
        padding: 0.5rem 1rem;

        height: 100%;
        align-items: center;
        &:hover {
          background-color: @header-hover-color;
          transform: scale(0.95);
        }
      }
      .curr {
        background-color: @header-hover-color;
        transform: scale(0.95);
      }
    }
  }
}
</style>
