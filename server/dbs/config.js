export default {
  dbs:'mongodb://127.0.0.1:27017/student',
  redis:{
    get host(){
      return '127.0.0.1'
    },
    get post(){
      return 6379
    }
  },
  smtp:{
    get host(){
      return 'smtp.qq.com'
    },
    get user() {
      return '1410837981@qq.com'
    },
    get pass(){
      // ipwgmtzdpqisgbbf
      // vfxungbdrgoefedd
      return 'zoznlpgkmkbxgjeh'
    },
    get code(){
      return ()=>{
        //验证码
        return Math.random().toString(16).slice(2,6).toUpperCase();
      }
    },
    get expire(){
      return () =>{
        return new Date().getTime() + 60*60*1000
      }
    }
  }



}
