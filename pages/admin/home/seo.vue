<template>
  <a-spin tip="Loading..." :spinning="spinning">
    <div class="card-item">
      <a-card style="width: 100%" title="SEO管理" :tab-list="tabList" :active-tab-key="key" @tabChange="(key) => onTabChange(key, 'key')">
        <a-alert message="系统提示" description="修改上述SEO信息，点击保存，网站SEO信息会同步更新。" type="info" show-icon />
        <span slot="customRender" slot-scope="item"> <img :src="item.icon" />{{ item.name }} </span>
        <seo-form :code="key" @callback="callback" style="margin-top: 20px;"></seo-form>
      </a-card>
    </div>
  </a-spin>
</template>

<script>
export default {
  data() {
    return {
      spinning: false,
      tabList: [
        {
          key: 'boc',
          scopedSlots: { tab: 'customRender' },
          name: '中国银行',
          icon: require('@/assets/svg/cbc.svg')
        },
        {
          key: 'icbc',
          scopedSlots: { tab: 'customRender' },
          name: '工商银行',
          icon: require('@/assets/svg/icbc.svg')
        },
        {
          key: 'abc',
          scopedSlots: { tab: 'customRender' },
          name: '农业银行',
          icon: require('@/assets/svg/abc.svg')
        },
        {
          key: 'ccb',
          scopedSlots: { tab: 'customRender' },
          name: '建设银行',
          icon: require('@/assets/svg/ccb.svg')
        },
        {
          key: 'cmm',
          scopedSlots: { tab: 'customRender' },
          name: '交通银行',
          icon: require('@/assets/svg/cmm.svg')
        },
        {
          key: 'cmb',
          scopedSlots: { tab: 'customRender' },
          name: '招商银行',
          icon: require('@/assets/svg/cmb.svg')
        },
        {
          key: 'ceb',
          scopedSlots: { tab: 'customRender' },
          name: '光大银行',
          icon: require('@/assets/svg/ceb.svg')
        },
        {
          key: 'eci',
          scopedSlots: { tab: 'customRender' },
          name: '中信银行',
          icon: require('@/assets/svg/eci.svg')
        },
        {
          key: 'cib',
          scopedSlots: { tab: 'customRender' },
          name: '兴业银行',
          icon: require('@/assets/svg/cib.svg')
        },
        {
          key: 'spdb',
          scopedSlots: { tab: 'customRender' },
          name: '浦发银行',
          icon: require('@/assets/svg/spdb.svg')
        }
      ],
      key: 'boc'
    }
  },
  methods: {
    onTabChange(key, type) {
      this[type] = key
      this.spinning = true
    },
    callback() {
      this.spinning = false
    }
  }
}
</script>
<style lang="less" scoped>
.card-item {
  img {
    width: 32px;
    height: 32px;
  }
}
</style>
