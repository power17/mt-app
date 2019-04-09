<template>
    <div class="m-menu">
      <dl class="nav" @mouseleave="leave">
        <dt>全部分类</dt>
        <dd v-for="(item,index) in menu" :key="index" @mouseenter="enter" >
          <i :class="item.type"></i>{{item.name}}
          <span class="arrow"></span>
        </dd>
      </dl>
      <div class="detail" v-if="kind" @mouseenter="sover" @mouseleave="sout">
        <template v-for="(item,index) in curdetail.child" >
          <h4 :key="index">{{item.title}}</h4>
          <span v-for="v in item.child" :key="v">{{v}}</span>

        </template>
      </div>
    </div>
</template>

<script>
    export default {
       data(){
         return {
           kind:'',
           menu:[{
             type:'food',
             name:'美食',
             child:[{
               title:'美食',
               child:['代金券','甜品饮品','火锅','自助餐','小吃快餐',]
             }]
           },{
             type:'takeout',
             name:'外卖',
             child:[{
               title:'外卖',
               child:['代金券11','甜品饮42452品','火锅','自助餐','小吃快餐',]
             }]
           }]
         }
       },
      computed:{
        curdetail:function () {
          return this.menu.filter((item) => {return item.type ===this.kind})[0];
        }
      },
      methods:{
         enter:function (e) {

           this.kind = e.target.querySelector('i').className;

         },
        leave:function (e) {
           let self = this;
           self._timer = setTimeout(function () {
              self.kind = ''
           },150);


        },
        sover:function () {
          clearTimeout(this._timer);
        },
        sout: function () {
          this.kind = '';
        }
      }
    }
</script>

<style lang="scss">



</style>
