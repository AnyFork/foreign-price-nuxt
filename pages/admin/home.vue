<template>
  <a-layout class="layout" :hasSider="true">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible class="silder">
      <div class="logo">
        <img src="/logo.png" />
        <span v-show="!collapsed">人民币汇率网</span>
      </div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="selectedKeys" :selectedKeys="selectedKeys">
        <a-menu-item key="seo">
          <a-icon type="skype" />
          <nuxt-link to="/admin/home/seo.html" custom v-slot="{ navigate }">
            <span @click="navigate" role="link">SEO管理</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="adv">
          <a-icon type="google" />
          <nuxt-link to="/admin/home/adv.html" custom v-slot="{ navigate }">
            <span @click="navigate" role="link">广告管理</span>
          </nuxt-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="main">
      <a-layout-header class="head">
        <admin-home-header :collapse="collapsed" @callback="callback"></admin-home-header>
      </a-layout-header>
      <a-layout-content class="content">
        <nuxt />
      </a-layout-content>
      <a-layout-footer class="amdmin-footer">
        <admin-home-footer></admin-home-footer>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  name: 'HomePage',
  layout: 'logoLayout',
  middleware: 'login',
  head() {
    return {
      title: '人民币汇率网-后台管理平台',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '人民币汇率网，后台管理平台，人民币汇率网-后台管理平台'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: '人民币汇率网，后台管理平台，人民币汇率网-后台管理平台'
        }
      ]
    }
  },
  data() {
    return {
      collapsed: false,
      selectedKeys: []
    }
  },
  methods: {
    callback(collapse) {
      this.collapsed = collapse
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        this.selectedKeys = []
        if (to.fullPath.indexOf('seo.html') != -1) {
          this.selectedKeys.push('seo')
        } else {
          this.selectedKeys.push('adv')
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100vh;
  display: flex;
  .silder {
    height: 100vh;
    flex: 0 0 200px;
  }
  .logo {
    height: 32px;
    color: #fff;
    margin: 16px;
    line-height: 32px;
    display: flex;
    align-items: center;
    img {
      display: inline-block;
      width: 32px;
      height: 32px;
      margin-left: 10px;
    }
    span {
      font-weight: bold;
      font-size: 19px;
      display: inline-block;
      transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
  .main {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100vh;
    width: 100%;
    justify-content: space-between;
    .head {
      width: 100%;
      height: 64px;
      flex: 0 0 64px;
      padding: 0;
      position: relative;
      background-color: #fff;
    }
    .content {
      flex: 1;
      min-height: auto !important;
      margin: 14px 16px;
      padding: 10px 24px;
      background: #fff;
    }
    .amdmin-footer {
      flex: 0 0 30px;
      padding: 10px 0px;
    }
  }
}
</style>
