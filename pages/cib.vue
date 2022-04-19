<template>
  <div class="content">
    <!--顶部title -->
    <title-item title="今日兴业银行外汇牌价汇率表" :subtitle="'兴业银行外汇牌价更新时间：' + refresh"></title-item>
    <a-divider />
    <!--广告位 -->
    <advert-item :linkUrl="topLink" :imgSrc="topArr"></advert-item>
    <a-divider />
    <!--数据表格-->
    <nuxt-table :data="tableData" :columns="columns"></nuxt-table>
    <a-divider />
    <!--广告位 -->
    <advert-item :linkUrl="bottomLink" :imgSrc="bottomArr"></advert-item>
    <a-divider />
    <!--文本摘要 -->
    <Summary title="兴业银行外汇牌价表使用说明">
      <template slot="text">
        提供兴业银行当日美元、欧元、日元等主要货币兑人民币的即时外汇牌价表，单位为人民币兑100外币。本表中的<strong>现汇买入价:</strong>指银行买入外汇的汇率，<strong>现钞买入价:</strong>指银行买入外币现钞的汇率，<strong>现汇卖出价:</strong>指银行卖出外汇的汇率，<strong>现钞卖出价:</strong>指银行卖出外钞的汇率。外汇牌价数据随建行营业网点实时更新，此汇率适用兴业信用卡还款和兑换外汇外钞，交易以实际兑换汇率为准。点击货币种类可以单独查询此外币币种的今日实时牌价并可以输入数额换算兑换汇率。
      </template>
    </Summary>
    <!--十大银行汇率，排除当前选中的银行 -->
    <bank-list filterOption="CIB"></bank-list>
  </div>
</template>

<script>
import head from '@/mixin/head'
import symbol from '@/server/utils/symbol'
export default {
  name: 'cib',
  layout: 'default',
  mixins: [head],
  async asyncData({ $axios }) {
    //批量获取数据
    const [seoData, data, imgData] = await Promise.all([$axios.$post('/admins/seoInfo', { code: 'cib' }), $axios.$get('/api/105-32?bankCode=CIB', { timeout: 3000 }), $axios.post('/admins/imgList')])
    //解析head数据
    const { title = '', description = '', keywords = '' } = seoData.data
    //解析广告信息
    const { topImg = '', bottomImg = '', topLink = '', bottomLink = '' } = imgData.data.data
    //数据包装
    const topArr = topImg ? '../../' + topImg : ''
    const bottomArr = bottomImg ? '../../' + bottomImg : ''
    //不包含的货币
    const filterArrays = []
    //包含的货币
    let tableData = []
    //刷新
    let refresh = ''
    if (data.showapi_res_code === 0) {
      const body = data.showapi_res_body
      const list = body.codeList || []
      refresh = body ? body.day + ' ' + body.time : ''
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
    } else {
      console.log(data.showapi_res_error)
    }
    return { tableData, refresh, title, description, keywords, topArr, bottomArr, topLink, bottomLink }
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
