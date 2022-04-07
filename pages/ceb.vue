<template>
  <div class="content">
    <!--顶部title -->
    <title-item title="今日光大银行外汇牌价汇率表" :subtitle="'光大银行外汇牌价更新时间：' + refresh"></title-item>
    <a-divider />
    <!--广告位 -->
    <advert-item linkUrl="https://top.talkfx.co/" :imgSrc="require('@/static/image/ad1.png')"></advert-item>
    <a-divider />
    <!--数据表格-->
    <nuxt-table :data="tableData" :columns="columns"></nuxt-table>
    <a-divider />
    <!--广告位 -->
    <advert-item linkUrl="http://www.usdau.com/" :imgSrc="require('@/static/image/ad2.png')"></advert-item>
    <a-divider />
    <!--文本摘要 -->
    <Summary title="光大银行外汇牌价表使用说明">
      <template slot="text">
        提供中国光大银行当日美元、欧元、日元等16种主要货币兑人民币的即时外汇牌价表，单位为人民币兑100外币。本表中的<strong>现汇买入价：</strong>指银行买入外汇的汇率，<strong>现钞买入价：</strong>指银行买入外币现钞的汇率，<strong>现汇卖出价：</strong>指银行卖出外汇的汇率，<strong>现钞卖出价：</strong>指银行卖出外钞的汇率。外汇牌价数据随光大银行营业网点更新，此汇率适用光大信用卡还款和兑换外汇外钞，交易以实际兑换汇率为准。点击货币种类可以单独查询此外币币种的今日实时汇率并可以输入数额计算兑换汇率。
      </template>
    </Summary>
    <!--十大银行汇率，排除当前选中的银行 -->
    <bank-list filterOption="CEBBANK"></bank-list>
  </div>
</template>

<script>
export default {
  name: 'ceb',
  layout: 'default',
  head() {
    return {
      title: '今日光大银行汇率 最新光大银行外汇牌价查询',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '提供中国光大银行当日美元及人民币等16种主要货币的即时外汇牌价,光大银行汇率查询服务和汇率计算工具。'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: '光大银行汇率,光大银行外汇牌价,光大银行外汇汇率,光大银行'
        }
      ]
    }
  },
  async asyncData({ $axios }) {
    const symbol = [
      '美元',
      '欧元',
      '英镑',
      '日元',
      '澳大利亚元',
      '加拿大元',
      '瑞士法郎',
      '新西兰元',
      '瑞典克朗',
      '丹麦克朗',
      '挪威克朗',
      '港币',
      '澳门元',
      '新台币',
      '韩国元',
      '新加坡元',
      '泰国铢',
      '印尼卢比',
      '印度卢比',
      '菲律宾比索',
      '林吉特',
      '阿联酋迪拉姆',
      '沙特里亚尔',
      '土耳其里拉',
      '南非兰特',
      '巴西里亚尔',
      '卢布'
    ]
    //不包含的货币
    const filterArrays = []
    //包含的货币
    let tableData = []
    const data = await $axios.$get('/105-32?bankCode=CEBBANK', { timeout: 3000 })
    if (data.showapi_res_code === 0) {
      const body = data.showapi_res_body
      const list = body.codeList || []
      const refresh = body ? body.day + ' ' + body.time : ''
      list.forEach((element) => {
        if (element.code !== 'RMB') {
          const hui_in = element.hui_in
          const chao_out = element.chao_out
          const chao_in = element.chao_in
          const hui_out = element.hui_out
          const key = element.code
          const name = element.name
          if (element.hui_in != '--' || element.chao_in != '--' || element.chao_out != '--' || element.hui_out != '--') {
            if (symbol.indexOf(name) > -1) {
              tableData[symbol.indexOf(name)] = { hui_in, chao_in, chao_out, hui_out, key, name }
            } else {
              filterArrays.push({ hui_in, chao_in, chao_out, hui_out, key, name })
            }
          }
        }
      })
      tableData = tableData.concat(filterArrays)
      //去除数组中为空的元素
      tableData = tableData.filter((item) => item != '')
      return { tableData, refresh }
    } else {
      console.log(data.showapi_res_error)
      return { tableData, refresh: '' }
    }
  },
  data() {
    return {
      columns: [
        {
          title: '币种',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: { customRender: 'name' },
          align: 'center'
        },
        {
          title: '现汇买入',
          dataIndex: 'hui_in',
          key: 'hui_in',
          align: 'center'
        },
        {
          title: '现钞买入',
          dataIndex: 'chao_in',
          key: 'chao_in',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '现汇卖出',
          dataIndex: 'hui_out',
          key: 'hui_out',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '现钞卖入',
          dataIndex: 'chao_out',
          key: 'chao_out',
          ellipsis: true,
          align: 'center'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  width: @main-container-width;
  margin: 0px auto;
  border: 1px solid #00000029;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #fff;
  .ads {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-divider {
    margin: 8px 0px;
  }
}
</style>
