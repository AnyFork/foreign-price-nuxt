<template>
  <div class="rate-box">
    <div class="rate-main-title">{{ fromCodeName }}兑{{ toCodeName }}汇率在线实时查询换算</div>
    <div class="rate-sub-title">输入兑换{{ fromCodeName }}或{{ toCodeName }}数额或直接查询汇率</div>
    <div>
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSubmit">
        <a-form-item label="兑换金额">
          <a-input v-decorator="['num', { initialValue: 1, rules: [{ required: true, message: '请输入兑换金额' }] }]" />
        </a-form-item>
        <a-form-item label="原始货币">
          <a-select v-decorator="['origin', { initialValue: fromCode, rules: [{ required: true, message: '请输入原始货币' }] }]" :getPopupContainer="getPopupContainer" showSearch option-filter-prop="children" :filter-option="filterOption" @select="originSelect">
            <a-select-option :value="item.key" v-for="(item, index) in option" :key="index">{{ item.name + '(' + item.key + ')' }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="目标货币">
          <a-select v-decorator="['dest', { initialValue: toCode, rules: [{ required: true, message: '请输入目标货币' }] }]" :getPopupContainer="getPopupContainer" showSearch option-filter-prop="children" :filter-option="filterOption" @select="destSelect">
            <a-select-option :value="item.key" v-for="item in option" :key="item.key">{{ item.name + '(' + item.key + ')' }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
          <a-button type="primary" html-type="submit" style="width: 100%">汇率兑换</a-button>
        </a-form-item>
      </a-form>
      <div class="result" v-if="result">{{ result }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RateICacl',
  props: {
    fromCodeName: {
      require: true,
      type: String
    },
    toCodeName: {
      require: true,
      type: String
    },
    fromCode: {
      require: true,
      type: String
    },
    toCode: {
      require: true,
      type: String
    }
  },
  watch: {
    fromCodeName() {
      this.originName = this.fromCodeName + '(' + this.fromCode + ')'
    },
    toCodeName() {
      this.destName = this.toCodeName + '(' + this.toCode + ')'
    }
  },
  data() {
    return {
      option: [
        { key: 'IDR', name: '印尼卢比' },
        { key: 'NZD', name: '新西兰元' },
        { key: 'SGD', name: '新加坡元' },
        { key: 'THB', name: '泰国铢' },
        { key: 'SEK', name: '瑞典克朗' },
        { key: 'JPY', name: '日元' },
        { key: 'CHF', name: '瑞士法郎' },
        { key: 'RUB', name: '卢布' },
        { key: 'PHP', name: '菲律宾比索' },
        { key: 'HKD', name: '港币' },
        { key: 'MYR', name: '林吉特' },
        { key: 'EUR', name: '欧元' },
        { key: 'INR', name: '印度卢比' },
        { key: 'DKK', name: '丹麦克朗' },
        { key: 'CAD', name: '加拿大元' },
        { key: 'NOK', name: '挪威克朗' },
        { key: 'AED', name: '阿联酋迪拉姆' },
        { key: 'SAR', name: '沙特里亚尔' },
        { key: 'BRL', name: '巴西里亚尔' },
        { key: 'MOP', name: '澳门元' },
        { key: 'ZAR', name: '南非兰特' },
        { key: 'TRY', name: '土耳其里拉' },
        { key: 'USD', name: '美元' },
        { key: 'CNY', name: '人民币' },
        { key: 'TWD', name: '新台币' },
        { key: 'GBP', name: '英镑' },
        { key: 'KRW', name: '韩国元' },
        { key: 'AUD', name: '澳大利亚元' }
      ],
      result: '',
      originName: '',
      destName: '',
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  methods: {
    originSelect(value, option) {
      this.originName = option.componentOptions.children[0].text
    },
    destSelect(value, option) {
      this.destName = option.componentOptions.children[0].text
    },
    getPopupContainer(triggerNode) {
      return triggerNode.parentNode || document.body
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const { num, origin, dest } = values
          this.caclData(origin, dest, num)
        } else {
          return false
        }
      })
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    async caclData(origin, dest, num) {
      const data = await this.$axios.$get(`/api/105-31?fromCode=${origin}&money=${num}&toCode=${dest}`)
      if (data.showapi_res_code === 0) {
        const rateMoney = data.showapi_res_body.money - 0
        this.result = `${num}${this.originName} = ${rateMoney.toFixed(4)} ${this.destName}`
      } else {
        console.log(data.showapi_res_error)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.rate-box {
  width: 100%;
  margin-top: 10px;
  box-sizing: border-box;
  .rate-main-title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .rate-sub-title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
  }
  .rate-table {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 3px;
    div {
      border: 1px solid #e8e8e8;
      text-align: center;
      display: inline-flex;
      align-items: center;
      padding: 10px;
      justify-content: center;
      font-weight: bold;
    }
    .rate-left {
      flex: 0.4;
    }
    .rate-right {
      flex: 0.6;
      border-left: none;
    }
  }
  .result {
    width: 80%;
    margin: 0px auto;
    margin-bottom: 20px;
    background-color: #e8e8e8;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
  }
}
</style>
