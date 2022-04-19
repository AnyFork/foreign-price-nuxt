<template>
  <a-spin tip="Loading..." :spinning="spinning">
    <div class="login-container">
      <div class="login-content">
        <div class="login-content-main">
          <div class="right-form box">
            <div class="login-content-title">用户登录</div>
            <a-form class="form-content" :wrapper-col="{ span: 24 }" autocomplete="off" :form="form" @submit="handleSubmit">
              <a-form-item>
                <a-input v-decorator="['userName', { rules: [{ required: true, message: '请输入账号' }], validateFirst: true }]" placeholder="请输入账号">
                  <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input-password v-decorator="['userPassword', { rules: [{ required: true, message: '请输入密码' }], validateFirst: true }]" placeholder="请输入密码">
                  <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
                </a-input-password>
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 24 }">
                <a-button type="primary" block html-type="submit" :loading="loading">登录</a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
      <div class="login-copyright">
        <div class="mb5 login-copyright-company"></div>
        <div class="login-copyright-msg"></div>
      </div>
    </div>
  </a-spin>
</template>

<script>
export default {
  head() {
    return {
      title: '人民币汇率网-后台管理平台',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '人民币汇率网，后台管理平台，人民币汇率网-后台管理平台'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: '人民币汇率网，后台管理平台，人民币汇率网-后台管理平台'
        }
      ]
    }
  },
  name: 'Login',
  layout: 'logoLayout',
  middleware: 'login',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'dynamic_rule' }),
      spinning: false,
      loading: false
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (err) {
          console.log('Received values of form: ', values)
        } else {
          this.loading = true
          this.login(values)
        }
      })
    },
    async login(values) {
      this.spinning = true
      const { data } = await this.$axios.post('/admins/login', { ...values })
      this.spinning = false
      if (data.code === 200) {
        this.$message.success(data.msg, 2, () => {
          this.$router.push('/admin/home/seo.html')
          this.loading = false
        })
      } else {
        this.$message.error(data.msg, 2, () => {
          this.loading = false
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url('/bg-login.png') no-repeat;
  background-size: cover;
  .login-content {
    width: 500px;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) translate3d(0, 0, 0);
    background-color: rgba(255, 255, 255, 0.99);
    border: 5px solid #519ee463;
    border-radius: 4px;
    transition: all 0.3s ease;
    overflow: hidden;
    z-index: 1;
    .login-content-main {
      margin: 0 auto;
      width: 80%;
      .login-content-title {
        color: #333;
        font-weight: 500;
        font-size: 22px;
        text-align: center;
        letter-spacing: 4px;
        margin: 15px 0 30px;
        white-space: nowrap;
        z-index: 5;
        position: relative;
        transition: all 0.3s ease;
      }
    }
  }
  .login-copyright {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    text-align: center;
    color: var(--color-whites);
    font-size: 12px;
    opacity: 0.8;
    .login-copyright-company {
      white-space: nowrap;
    }
    .login-copyright-msg {
      white-space: nowrap;
    }
  }
}
</style>
