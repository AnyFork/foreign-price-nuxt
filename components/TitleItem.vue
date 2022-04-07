<template>
  <div class="title">
    <div class="mainTitle" v-text="title"></div>
    <div class="subTitle" v-text="subtitle"></div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'TitleItem',
  props: {
    title: {
      require: true,
      type: String
    },
    subtitle: {
      require: true,
      type: String
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    width: 100%;
    text-align: center;
  }
  .mainTitle {
    margin-top: 5px;
    font-size: 16px;
    font-weight: bold;
    color: #2b3c4e;
    line-height: 2;
  }
  .subTitle {
    height: 20px;
    font-size: 12px;
  }
}
</style>
