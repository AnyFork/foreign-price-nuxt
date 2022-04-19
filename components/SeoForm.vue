<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="SEO标题">
      <a-textarea v-decorator="['title', { rules: [{ required: true, message: '请输入标题!' }] }]" allow-clear :auto-size="{ minRows: 4, maxRows: 6 }" />
    </a-form-item>
    <a-form-item label="SEO关键字">
      <a-textarea v-decorator="['keywords', { rules: [{ required: true, message: '请输入关键字' }] }]" allow-clear :auto-size="{ minRows: 4, maxRows: 6 }" />
    </a-form-item>
    <a-form-item label="SEO描述">
      <a-textarea v-decorator="['description', { rules: [{ required: true, message: '请输入描述信息' }] }]" allow-clear :auto-size="{ minRows: 4, maxRows: 6 }" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit" :loading="loading"> 提交保存 </a-button> <a :href="url" target="_blank" style="margin-left: 50px; font-size: 14px; margin-top: 10px; padding: 6px 10px; border: 1px dashed; border-radius: 5px">点击预览</a>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  props: {
    code: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      loading: false,
      url: ''
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (err) {
          return
        } else {
          this.storeValues(values)
        }
      })
    },
    async storeValues(values) {
      this.loading = true
      const { data } = await this.$axios.post('/admins/seoAdd', { ...values, code: this.code })
      if (data.code === 200) {
        this.$message.success(data.msg, 3, () => {
          this.loading = false
        })
      } else {
        this.$message.error(data.msg, 3, () => {
          this.loading = false
        })
      }
    },
    async getSeoInfo() {
      const { data } = await this.$axios.post('/admins/seoInfo', { code: this.code })
      if (data.code === 200) {
        const { title = '', keywords = '', description = '' } = data.data
        this.form.setFieldsValue({ title: title })
        this.form.setFieldsValue({ keywords: keywords })
        this.form.setFieldsValue({ description: description })
      } else {
        this.$message.error(data.msg)
      }
      //回调关闭spin
      this.$emit('callback')
    }
  },
  watch: {
    code: {
      handler(newCode, oldCode) {
        if (newCode === 'boc') {
          this.url = '/'
        } else {
          this.url = '/' + newCode + '.html'
        }
        this.getSeoInfo()
      },
      immediate: true
    }
  }
}
</script>
