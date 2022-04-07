<template>
  <div class="link-block">
    <h3 v-text="title"></h3>
    <div class="text-content">
      <slot name="text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Summary',
  props: {
    title: {
      require: true,
      type: String
    }
  }
}
</script>
<style lang="less" scoped>
.link-block {
  padding: 5px;
  margin: 10px 5px 0px 5px;
  h3 {
    font-weight: bold;
  }
  .text-content {
    text-indent: 20px;
    line-height: 2;
  }
}
</style>
