<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="顶部广告链接">
      <a-textarea v-decorator="['topLink', { rules: [{ required: true, message: '请输入顶部广告链接!' }], initialValue: link.topLink }]" allow-clear :auto-size="{ minRows: 4, maxRows: 6 }" placeholder="请输入顶部广告链接" />
    </a-form-item>
    <a-form-item label="底部广告链接">
      <a-textarea v-decorator="['bottomLink', { rules: [{ required: true, message: '请输入底部广告链接!' }], initialValue: link.bottomLink }]" allow-clear :auto-size="{ minRows: 4, maxRows: 6 }" placeholder="请输入底部广告链接" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit" :loading="loading"> 提交保存 </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  props: {
    link: {
      required: true,
      type: Object,
      default: {
        topLink: '',
        bottomLink: ''
      }
    }
  },
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      loading: false
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
      const { data } = await this.$axios.post('/admins/link', { ...values })
      if (data.code === 200) {
        this.$message.success(data.msg, 3, () => {
          this.loading = false
        })
      } else {
        this.$message.error(data.msg, 3, () => {
          this.loading = false
        })
      }
    }
  }
}
</script>
