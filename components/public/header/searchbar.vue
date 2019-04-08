<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
      </el-col>
      <el-col class="center" :span="15">
        <div class="wrapper">
          <el-input placeholder="搜索商家或地点" v-model="isSearch" @focus="focus" @blur="blur" @input="input"></el-input>
          <el-button type="primary" icon="el-icon-search"></el-button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt >热门搜索</dt>
            <dd v-for="(item,index) in hotPlaceList" :key="index">{{item}}</dd>

          </dl>
          <dl class="searchList"  v-if="isSearchList">
            <dd v-for="(item,index) in searchList" :key="index">{{item}}</dd>

          </dl>
        </div>
        <p class="suggset">
          <a href="#">故宫博物馆</a>
          <a href="#">故宫博物馆</a>
          <a href="#">故宫博物馆</a>
          <a href="#">故宫博物馆</a>
          <a href="#">故宫博物馆</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">名宿公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col class="right" :span="6">
        <ul class="security">
          <li><i class="refund"><p class="txt">随时退</p></i></li>
          <li><i class="single"><p class="txt">不满意免单</p></i></li>
          <li><i class="overdue"><p class="txt">过期退</p></i></li>
        </ul>
      </el-col>
    </el-row>
  </div>

</template>

<script>
    export default {
        data(){
          return{
            isSearch : '',
            isFocuses : false,
            searchList:['hello','hello','hello'],
            hotPlaceList:['hi','hi','hi']
          }
        },
      computed:{
          isHotPlace: function () {
            console.log(111)
            return this.isFocuses && !this.isSearch;
          },
         isSearchList: function () {
           return this.isFocuses && this.isSearch;
         }
      },
      methods:{
          focus: function () {
            this.isFocuses = true;
          },
          blur: function () {
            this.isFocuses = false;
          },
          input:function () {

          }
      }
    }
</script>

<style scoped>

</style>
