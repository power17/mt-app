<template>
  <el-container class="layout-default">
    <el-header style="height: 197px;">
      <my-header></my-header>
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <my-footer height="100%"></my-footer>
  </el-container>
</template>
<script>
  import MyHeader from '@/components/public/header/index'
  import MyFooter from '@/components/public/footer/index'
  export default {
    components:{
      MyHeader,
      MyFooter
    }
  }
</script>
<style lang="scss">
  @import "@/assets/css/public/layout.scss";


</style>

