<template>
  <el-row :gutter="15">
    <el-col :span="6">
      <geo></geo>
    </el-col>
    <el-col :span="6">
      <user></user>
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>
</template>

<script>
  import Geo from './geo'
  import User from './user'
    export default {
        components:{
          Geo,
          User
        }
    }
</script>

<style lang="scss">
  @import "@/assets/css/public/layout.scss";

</style>
