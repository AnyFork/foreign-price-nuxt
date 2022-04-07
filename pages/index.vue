<template>
  <div class="content">
    <!--顶部title -->
    <title-item title="今日中国银行外汇牌价汇率表" :subtitle="'中行外汇牌价表更新时间：' + refresh"></title-item>
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
    <Summary title="中国银行外汇牌价表使用说明">
      <template slot="text">
        提供当日中国银行美元、欧元、日元、港币等主要货币兑换人民币的即时外汇牌价表，单位为人民币兑100外币。本中国银行汇率表中的<strong>现汇买入价:</strong>指中行买入外汇的汇率，<strong>现钞买入价:</strong>指中国银行买入外币现钞的汇率，<strong>现汇卖出价:</strong>指银行卖出外汇的汇率，<strong>现钞卖出价:</strong>指银行卖出外钞现钞的汇率，<strong>折算价:</strong>是中国银行根据国家外汇管理局外汇牌价中间价及自身情况确定的汇率基准价。外汇牌价数据随中国银行营业网点实时更新，此中国银行汇率适用信用卡还款和兑换外汇外钞，交易以实际兑换汇率为准。点击货币名称即可查询此外币货币的今日最新中行外汇牌价并可以输入数额换算兑换汇率。
      </template>
    </Summary>
    <!--十大银行汇率，排除当前选中的银行 -->
    <bank-list filterOption="BOC"></bank-list>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '中国银行外汇牌价_今日最新中行汇率表查询',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '提供今天中国银行外汇牌价，最新美元、欧元、日元、英镑等18种主要货币对人民币的即时中国银行外汇牌价表,中行汇率实时查询服务和计算工具。'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: '中国银行外汇牌价,中国银行汇率,外汇牌价,中国银行,中行'
        }
      ]
    }
  },
  name: 'boc',
  layout: 'default',
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
    const data = await $axios.$get('/105-30', { timeout: 3000 })
    if (data.showapi_res_code === 0) {
      const body = data.showapi_res_body
      const list = body.list || []
      const refresh = list[0] ? list[0].day + ' ' + list[0].time : ''
      list.forEach((element) => {
        if (element.code !== 'CNY') {
          const hui_in = element.hui_in || '-'
          const chao_out = element.chao_out || '-'
          const chao_in = element.chao_in || '-'
          const hui_out = element.hui_out || '-'
          const zhesuan = element.zhesuan || '-'
          const key = element.code
          const name = element.name
          if (symbol.indexOf(name) > -1) {
            tableData[symbol.indexOf(name)] = { hui_in, chao_in, chao_out, hui_out, zhesuan, key, name }
          } else {
            filterArrays.push({ hui_in, chao_in, chao_out, hui_out, zhesuan, key, name })
          }
        }
      })
      tableData = tableData.concat(filterArrays)
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
        },
        {
          title: '中行折算价',
          dataIndex: 'zhesuan',
          key: 'zhesuan',
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
