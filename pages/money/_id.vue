<template>
  <div class="content">
    <!--顶部title -->
    <title-item :title="fromCodeName + '对' + toCodeName + '汇率'" :subtitle="`${fromCodeName}汇率每5分钟更新一次`">
      <rate-item :fromCodeName="fromCodeName" :toCodeName="toCodeName" :rateMoney="rateMoney"></rate-item>
    </title-item>
    <a-divider />
    <!--广告位 -->
    <advert-item :linkUrl="topLink" :imgSrc="topArr"></advert-item>
    <a-divider />
    <!--计算表单-->
    <rate-cacl :fromCodeName="fromCodeName" :toCodeName="toCodeName" :fromCode="fromCode" :toCode="toCode"></rate-cacl>
    <a-divider />
    <!--广告位 -->
    <advert-item :linkUrl="bottomLink" :imgSrc="bottomArr"></advert-item>
    <a-divider />
    <!--文本摘要 -->
    <Summary :title="title">
      <template slot="text">
        外币汇率换算公式：四大银行有汇兑业务的货币为(银行平均卖出价+银行平均买入价+中国人民银行基准价)/3，非常用外币以此货币在外汇交易市场中兑美元汇率再兑人民币计算得出。输入需要换算的{{ fromCodeName }}或人民币的金额，选择原始货币与目标货币，点击换算即可按今日最新{{
          fromCodeName
        }}实时汇率换算出可兑换等于多少人民币钱数。
      </template>
    </Summary>
    <!--常用货币兑人民币汇率-->
    <money-list :moneyList="moneyList"></money-list>
    <!--十大银行汇率，排除当前选中的银行 -->
    <bank-list title="十大银行外汇牌价表"></bank-list>
  </div>
</template>

<script>
export default {
  name: 'RateDeatils',
  layout: 'default',
  head() {
    return {
      title: `${this.fromCodeName}汇率_今日${this.fromCodeName}兑换人民币最新外汇牌价查询计算`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `今日${this.fromCodeName}的即时外汇牌价,${this.fromCodeName}汇率查询服务和汇率计算工具，人民币对${this.fromCodeName}兑换汇率换算器。`
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: `${this.fromCodeName}汇率，外汇牌价汇率,${this.fromCodeName}兑换人民币汇率`
        }
      ]
    }
  },
  async asyncData({ $axios, params }) {
    const fromCode = params.id.split('-')[0].toUpperCase()
    const toCode = params.id.split('-')[1].toUpperCase()
    const [data, imgData] = await Promise.all([$axios.$get(`/api/105-31?fromCode=${fromCode}&money=1&toCode=${toCode}`), $axios.post('/admins/imgList')])
    //解析广告信息
    const { topImg = '', bottomImg = '', topLink = '', bottomLink = '' } = imgData.data.data
    //数据包装
    const topArr = topImg ? '../../' + topImg : ''
    const bottomArr = bottomImg ? '../../' + bottomImg : ''
    let rateMoney = ''
    if (data.showapi_res_code === 0) {
      rateMoney = data.showapi_res_body.money - 0
    } else {
      console.log(data.showapi_res_error)
    }
    return { rateMoney, fromCode, toCode, topArr, bottomArr, topLink, bottomLink }
  },
  mounted() {
    this.fromCodeName = localStorage.getItem('fromCodeName')
    this.toCodeName = localStorage.getItem('toCodeName')
    this.title = this.fromCodeName + '汇率换算器使用说明'
    //过滤掉当前货币
    this.moneyList.data = this.symbol.filter((item) => item.name != this.fromCodeName)
  },
  data() {
    return {
      fromCodeName: '',
      toCodeName: '',
      symbol: [
        { href: '/money/idr-cny.html', name: '印尼卢比' },
        { href: '/money/nzd-cny.html', name: '新西兰元' },
        { href: '/money/sgd-cny.html', name: '新加坡元' },
        { href: '/money/thb-cny.html', name: '泰国铢' },
        { href: '/money/sek-cny.html', name: '瑞典克朗' },
        { href: '/money/aud-cny.html', name: '澳大利亚元' },
        { href: '/money/aed-cny.html', name: '阿联酋迪拉姆' },
        { href: '/money/jpy-cny.html', name: '日元' },
        { href: '/money/chf-cny.html', name: '瑞士法郎' },
        { href: '/money/rub-cny.html', name: '卢布' },
        { href: '/money/php-cny.html', name: '菲律宾比索' },
        { href: '/money/hkd-cny.html', name: '港币' },
        { href: '/money/myr-cny.html', name: '林吉特' },
        { href: '/money/eur-cny.html', name: '欧元' },
        { href: '/money/inr-cny.html', name: '印度卢比' },
        { href: '/money/dkk-cny.html', name: '丹麦克朗' },
        { href: '/money/cad-cny.html', name: '加拿大元' },
        { href: '/money/nok-cny.html', name: '挪威克朗' },
        { href: '/money/mop-cny.html', name: '澳门元' },
        { href: '/money/zar-cny.html', name: '南非兰特' },
        { href: '/money/try-cny.html', name: '土耳其里拉' },
        { href: '/money/usd-cny.html', name: '美元' },
        { href: '/money/twd-cny.html', name: '新台币' },
        { href: '/money/gbp-cny.html', name: '英镑' },
        { href: '/money/krw-cny.html', name: '韩国元' },
        { href: '/money/sar-cny.html', name: '沙特里亚尔' },
        { href: '/money/brl-cny.html', name: '巴西里亚尔' }
      ],
      title: '',
      dataType: '',
      moneyList: {
        title: '常用货币兑人民币汇率',
        data: []
      }
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
