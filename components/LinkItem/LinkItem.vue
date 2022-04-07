<template>
  <div class="link">
    <div class="link-block">
      <h3 v-text="firstLink.title"></h3>
      <div class="text-content">
        <slot name="firstContent"></slot>
      </div>
    </div>
    <div class="link-block">
      <h3 v-text="secondLink.title"></h3>
      <div class="link-content">
        <nuxt-link class="link-btn" :to="item.href" v-for="(item, index) in secondLink.data" v-text="item.name" :key="'second' + index" @click.native="handlerEvent(item, secondLink.key)"></nuxt-link>
      </div>
    </div>
    <div class="link-block" v-if="thirdLink">
      <h3 v-text="thirdLink.title"></h3>
      <div class="link-content">
        <a class="link-btn" :href="item.href" v-for="(item, index) in thirdLink.data" v-text="item.name" :key="'third' + index"></a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LinkItem',
  props: {
    firstLink: {
      require: true,
      type: Object,
      default: () => {}
    },
    secondLink: {
      require: true,
      type: Object,
      default: () => {}
    },
    thirdLink: {
      require: false,
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handlerEvent(item, key) {
      if (key === 1) {
        localStorage.setItem('fromCode', item.href.split('-')[0].substring(1).toUpperCase())
        localStorage.setItem('toCode', 'CNY')
        localStorage.setItem('fromCodeName', item.name)
        localStorage.setItem('toCodeName', '人民币')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.link {
  width: 100%;
  padding: 5px;
  .link-block {
    margin: 10px 5px;
    h3 {
      padding: 0px;
      margin: 0px 0px 5px 0px;
    }
    .text-content {
      text-indent: 20px;
      line-height: 2;
    }
    .link-content {
      .link-btn {
        box-sizing: border-box;
        font-size: 14px;
        font-variant: tabular-nums;
        list-style: none;
        margin-right: 10px;
        margin-top: 8px;
        padding: 2px 10px;
        line-height: 30px;
        text-align: center;
        white-space: nowrap;
        border-radius: 5px;
        transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        background-color: rgb(16, 142, 233);
        color: #fff;
        display: inline-block;
      }
    }
  }
}
</style>
