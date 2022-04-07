<template>
  <div class="poster" :style="{ height: height + 'px' }">
    <a :href="linkUrl" target="_blank" :style="{ background: 'url(' + imgSrc + ') 100% 50% / cover' }"></a>
  </div>
</template>
<script>
export default {
  name: 'AdvertItem',
  props: {
    height: {
      require: false,
      type: Number,
      default: 70
    },
    linkUrl: {
      require: true,
      type: String
    },
    imgSrc: {
      require: true,
      type: String
    }
  }
}
</script>
<style lang="less" scoped>
.poster {
  width: 100%;
  a {
    display: block;
    height: 100%;
    width: 100%;
  }
}
</style>
