<template>
  <div class="link">
    <div class="link-block">
      <h3 v-text="moneyList.title"></h3>
      <div class="link-content">
        <nuxt-link class="link-btn" :to="item.href" v-for="(item, index) in moneyList.data" v-text="item.name" :key="'moeny' + index" @click.native="handlerEvent(item)"></nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LinkItem',
  props: {
    moneyList: {
      require: true,
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handlerEvent(item) {
      localStorage.setItem('fromCode', item.href.split('-')[0].substring(1).toUpperCase())
      localStorage.setItem('toCode', 'CNY')
      localStorage.setItem('fromCodeName', item.name)
      localStorage.setItem('toCodeName', '人民币')
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
      font-weight: bold;
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
