<template>
  <div class="container">
    <div class="row">{{ text }}:</div>
    <a-upload action="/admins/upload" list-type="picture-card" :default-file-list="fileList" :before-upload="beforeUpload" @change="handleChange" :data="{ imgType }" @preview="preview" :remove="remove">
      <div v-if="showUpload">
        <a-icon type="plus" />
        <div class="ant-upload-text">upload</div>
      </div>
    </a-upload>
    <a-modal v-model="visible" :title="null" :footer="null" centered width="600">
      <img :src="imgUrl" />
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      required: false,
      type: String,
      default: 'Upload'
    },
    fileList: {
      required: true,
      type: Array
    },
    imgType: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      loading: false,
      visible: false,
      imgUrl: '',
      showUpload: this.fileList.length > 0 ? false : true
    }
  },
  methods: {
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        this.showUpload = false
        const result = info.file.response
        if (result && result.code === 200) {
          this.$message.success(result.msg)
        }
      }
    },
    beforeUpload(file) {
      //类型判断
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jif'
      if (!isJpgOrPng) {
        this.$message.error(`只能上传jpg,png,gif格式图片!`)
        return false
      }
      //大小判断
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片大小不能超过2M!')
        return false
      }
      return isJpgOrPng && isLt2M
    },
    async preview(file) {
      if (!file.url && !file.preview) {
        file.preview = await this.getBase64(file.originFileObj)
      }
      this.imgUrl = file.url || file.preview
      this.visible = true
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
    remove(file) {
      return new Promise((resolve, reject) => {
        const _this = this
        const modal = this.$confirm({
          title: '温馨提示',
          content: '你确定要删除图片吗?',
          centered: true,
          cancelText: '取消',
          okText: '确定',
          onOk() {
            _this.removeImg(file.name)
            modal.destroy()
            resolve(true)
          },
          onCancel() {
            resolve(false)
          }
        })
      })
    },
    async removeImg(fileName) {
      const { data } = await this.$axios.post('/admins/remove', { name: fileName, imgType: this.imgType })
      if (data.code === 200) {
        this.showUpload = true
        this.$message.success(data.msg)
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}
</script>
<style scoped lang="less">
.container {
  display: flex;
  padding-left: 15%;
  .row {
    width: 100px;
    line-height: 86px;
    text-align: right;
    padding-right: 10px;
    color: rgba(0, 0, 0, 0.85);
  }
}
i {
  font-size: 32px;
  color: #999;
  .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
}
</style>
