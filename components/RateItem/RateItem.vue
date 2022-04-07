<template>
  <div class="rate-box">
    <div class="rate-title">最新{{ fromCodeName }}兑{{ toCodeName }}实时汇率</div>
    <div class="rate-table">
      <div class="rate-left">{{ fromCodeName }}兑{{ toCodeName }}</div>
      <div class="rate-right">
        1{{ fromCodeName }} = <span class="rateResult">{{ rateMoney }}</span> {{ toCodeName }}
      </div>
    </div>
    <div class="rate-table">
      <div class="rate-left">{{ toCodeName }}兑{{ fromCodeName }}</div>
      <div class="rate-right">
        1{{ toCodeName }} = <span class="rateResult">{{ (1 / rateMoney).toFixed(4) }} </span>{{ fromCodeName }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RateItem',
  props: {
    rateMoney: {
      require: true,
      type: Number
    },
    fromCodeName: {
      require: true,
      type: String
    },
    toCodeName: {
      require: true,
      type: String
    }
  }
}
</script>
<style lang="less" scoped>
.rate-box {
  width: 100%;
  margin-top: 10px;
  box-sizing: border-box;
  .rate-title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
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
    .rateResult {
      color: green;
    }
  }
}
</style>
