<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
  import MyHeader from '@/components/public/header/index'
  export default {
    components:{
      MyHeader
    }
  }
</script>

