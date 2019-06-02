<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a
          href="/"
          class="site-logo"/>
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button
              type="primary"
              size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button round size="mini" @click="sendMessage">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="创建密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" show-password>></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" show-password>></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="register('ruleForm')">同意以下协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="http://www.meituan.com/about/terms"
            target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
  import CryptoJS from 'crypto-js'
  export default {
    layout: 'blank',
    data() {

      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        statusMsg: '',
        ruleForm: {
          name: '',
          email: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            {required: true, message: '请填写昵称', trigger: 'blur'}

          ],
          email: [
            {required: true, message: '请填写邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur']}
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          cpwd: [{
            required: true,
            message: '确认密码',
            trigger: 'blur'
          },
            {validator: validatePass2, trigger: 'blur'}
          ]


        },
        error: ''
      };
    },
    methods: {
      async register (formName) {
        let valid = await this.$refs[formName].validate()
          let self = this
          if (valid) {
            let data = await self.$axios.post('/users/signup', {
              username: window.encodeURIComponent(self.ruleForm.name),
              //CryptoJS.MD5(self.ruleForm.pwd) 返回数组
              password: CryptoJS.MD5(self.ruleForm.pwd).toString(),
              email: self.ruleForm.email,
              code: self.ruleForm.code
            })
            data = data.data
            if(data && data.code === 0 ) {
              location.href = '/login'
            }else {
              self.error = data.msg
            }
          } else {
            self.error = `服务器出错，错误吗${status}`
          }
          setTimeout(() => {
            self.error = ''
          },1500)

      },
      sendMessage() {
        const self = this;
        let namepass, emailpass;
        if (self.timerid) {
          return false;
        }
        this.$refs['ruleForm'].validateField('name', (valid) => {
          namepass = valid
        })
        self.message = ''
        if (namepass) return false
        this.$refs['ruleForm'].validateField('email', (valid) => {
          emailpass = valid
        })
        if (!namepass && !emailpass) {
          self.$axios.post('/users/verify', {
            username: encodeURIComponent(self.ruleForm.name),
            email: self.ruleForm.email
          }).then(({
                     status,
                     data
                   }) => {
            if (status === 200 && data && data.code === 0) {
              let count = 60
              self.statusMsg = `验证码已发送，剩余${count--}秒`
              self.timerid = setInterval(() => {
                self.statusMsg = `验证码已发送，剩余${count--}秒`
                if (count === 0) {
                  clearInterval(self.timerid)
                  self.statusMsg = ''
                }
              }, 1000)
            } else {
              self.statusMsg = data.msg
            }
          })
        }


      },


    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/register/index.scss";
</style>
