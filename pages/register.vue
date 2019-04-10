<template>
    <div class="page-register">
      <article class="header">
        <header>
          <a
            href="/"
            class="site-logo" />
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
            <el-button round size="mini">发送验证码</el-button>
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
            <el-button type="primary" @click="submitForm('ruleForm')">同意以下协议并注册</el-button>
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
  export default {
    layout:'blank',
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
            { required: true, message: '请填写昵称', trigger: 'blur' }

          ],
          email: [
            { required: true, message: '请填写邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
          ],
          code: [
            {required:true,message:'请输入验证码',trigger:'blur'}
          ],
          pwd: [
            { required:true,message:'请输入密码', trigger: 'blur' }
          ],
          cpwd: [{
            required: true,
            message: '确认密码',
            trigger: 'blur'
          },
            { validator: validatePass2, trigger: 'blur' }
          ]


        },
        error:''
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/register/index.scss";
</style>
