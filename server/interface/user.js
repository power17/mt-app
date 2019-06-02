import Router from  'koa-router'
import Redis from  'koa-redis'
import nodeMailer from 'nodemailer'

import User from './../dbs/models/user'
import axios from  './utils/axios'
import Passport from  './utils/passport'
import Email from  './../dbs/config'

let router = new Router({
  prefix: '/users',
});

let Store = new Redis().client;

/*
* 发送验证码
* */
router.post('/verify', async (ctx,next) => {
  let username = ctx.request.body.username;
  const saveExpire = await Store.hget(`nodemail:${username}`, `expire`);
  if(saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code : -1,
      msg: '验证请求过于频繁，1分钟内1刺'
    }
    return false
  }

  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    user: ctx.request.body.user,
    email: ctx.request.body.email,
  }
  let  mailOptions = {
    from: `"认证邮件"<${Email.smtp.user}>`,
    to: ko.email,
    subject: '《慕课网高仿美团网全栈实战》',
    html:`您在《慕课网高仿美团网全栈实战》课程中注册，您的邀请码是${ko.code}`
  }
  let transportOption = {
    host : Email.smtp.host,
    port: 587,
    secure:false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  }

  // 验证码发送
  let transporter = nodeMailer.createTransport(transportOption)
  await transporter.sendMail(mailOptions,(err,ctx) =>{
    if(err) {
      console.log(err)
    }else{

      //redis中存储
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
  ctx.body = {
    code : 0,
    msg : '验证码已发送，有效期1分钟'
  }
});
/*
* 注册
* */
router.post('/signup',async (ctx)=> {
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body;
 //验证码
 //  if(code) {
 //    const saveCode = await Store.hget(`nodemail:${username}`,'code')
 //    const saveExpire = await Store.hget(`nodemail:${username}`,'expire')
 //    if(code === saveCode) {
 //      if(new Date().getTime() - saveExpire > 0) {
 //        ctx.body = {
 //          code: -1,
 //          msg: '验证码已过期，请重新尝试'
 //        };
 //        return false;
 //      }
 //    }
 //    else{
 //      ctx.body = {
 //        code: -1,
 //        msg : '请填写正确的验证码'
 //      }
 //    }
 //  }else{
 //    ctx.body = {
 //      code:-1,
 //      msg:'请填写验证码'
 //    }
 //  }

  //用户名
  let user = await User.find({
    username
  });
  if(user.length) {
    ctx.body = {
      code: -1,
      msg : '已被注册'
    }
    return;
  }
  let nuser = await User.create({
    username,
    password,
    email
  })


  //注册成功
  if(nuser) {
    let res = await axios.post('/users/signin',{username,password,})

    if(res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    }else{
      ctx.body ={
        code:-1,
        msg: 'error'
      }
    }
  }else{
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }

});

router.post ('/signin', async (ctx,next) => {
  return Passport.authenticate('local', function (err,user,info,status) {
    if(err){
      ctx.body = {
        code: -1,
        msg: err
      }
    }else{
      if(user) {
        ctx.body= {
          code:0,
          msg:'登陆成功',
          user
        }
        return ctx.login(user);
      }else{
        ctx.body = {
          code : 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})



router .get ('/exit', async (ctx,next) => {
  if(!ctx.isAuthenticated()) {
    ctx.body = {
      code:0
    }
  } else{
    ctx.body = {
      code:-1
    }
  }
})

router.get('/getUser', async(ctx)=>{
  if(ctx.isAuthenticated()) {
    const {username,email} = ctx.session.passport.user
    ctx.body = {
       user:username,
       email
    }
  }else{
    ctx.body = {
      username:'',
      email: ''
    }
  }
})


export default router
