<template>
  <a-card title="广告管理" class="card">
    <a-alert message="系统提示" description="广告图片分为：顶部广告和底部广告，每一种类型均只允许上传一张，点击图片可以预览和删除，更换图片需要先删除后上传." type="info" show-icon />
    <div class="adv-box">
      <Upload text="顶部广告" :fileList="topArr" :imgType="1"></Upload>
      <Upload text="底部广告" :fileList="bottomArr" :imgType="2"></Upload>
      <LinkForm :link="link"></LinkForm>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'adv',
  async asyncData({ $axios }) {
    //获取图片和链接信息
    const { data } = await $axios.post('/admins/imgList')
    if (data && data.data) {
      const { topImg = '', bottomImg = '', topLink = '', bottomLink = '' } = data.data
      //数据包装
      const topArr = topImg ? [{ uid: '1', name: topImg, status: 'done', url: '../../' + topImg, thumbUrl: '../../' + topImg }] : []
      const bottomArr = bottomImg ? [{ uid: '2', name: bottomImg, status: 'done', url: '../../' + bottomImg, thumbUrl: '../../' + bottomImg }] : []
      console.log({ topArr, bottomArr, topLink, bottomLink })
      return { topArr, bottomArr, link: { topLink, bottomLink } }
    } else {
      return { topArr: [], bottomArr: [], link: { topLink: '', bottomLink: '' } }
    }
  },
  data() {
    return {}
  }
}
</script>
<style scoped lang="less">
.card {
  height: 100%;
  width: 100%;
  .adv-box {
    margin-top: 20px;
  }
}
</style>
