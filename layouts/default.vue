<template>
  <div class="defaultLayout">
    <Header></Header>
    <nuxt class="box" />
    <Footer></Footer>
  </div>
</template>
<script>
export default {
  name:'defaultLayout'
}
</script>
<style lang="less" scoped>
.defaultLayout {
  background-color: @body-bg-color;
  .box {
    position: relative;
    top: 75px;
  }
}
</style>
