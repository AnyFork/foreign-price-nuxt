<template>
  <div class="link">
    <div class="link-block">
      <h3 v-text="title"></h3>
      <div class="link-content">
        <nuxt-link class="link-btn" :to="item.href" v-for="(item, index) in bank" v-text="item.name" :key="'bank' + index"></nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BankList',
  props: {
    title: {
      require: false,
      type: String,
      default: '其他银行外汇牌价表'
    },
    filterOption: {
      require: false,
      type: String,
      default: ''
    }
  },
  mounted() {
    if (this.filterOption) {
      this.bank= this.origin.filter((item) => item.key !== this.filterOption)
    } else {
      this.bank = this.origin
    }
  },
  data() {
    return {
      bank: [],
      origin: [
        {
          name: '中国银行',
          href: '/',
          key: 'BOC'
        },
        {
          name: '工商银行',
          href: '/icbc.html',
          key: 'ICBC'
        },
        {
          name: '农业银行',
          href: '/abc.html',
          key: 'ABCHINA'
        },
        {
          name: '建设银行',
          href: '/ccb.html',
          key: 'CCB'
        },
        {
          name: '交通银行',
          href: '/cmm.html',
          key: 'BANKCOMM'
        },
        {
          name: '招商银行',
          href: '/cmb.html',
          key: 'CMBCHINA'
        },
        {
          name: '光大银行',
          href: '/ceb.html',
          key: 'CEBBANK'
        },
        {
          name: '中信银行',
          href: '/eci.html',
          key: 'ECITIC'
        },
        {
          name: '兴业银行',
          href: '/cib.html',
          key: 'CIB'
        },
        {
          name: '浦发银行',
          href: '/spdb.html',
          key: 'SPDB'
        }
      ]
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
      margin-bottom: 20px;
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
