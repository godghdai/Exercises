<template>
   <div>
      <div class="tab">
       <div class="tab-item"><router-link to="songNew">新歌</router-link></div>
       <div class="tab-item"><router-link to="songTop">排行</router-link></div>
       <div class="tab-item"><router-link to="songList">歌单</router-link></div>
       <div class="tab-item"><router-link to="singerCategory">歌手</router-link></div>
     </div>
        <keep-alive>
      <router-view class="content"></router-view>
        </keep-alive>
   </div>

</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

 .tab
    position:fixed
    top:0
    left:0
    display:flex
    width:100%
    padding:0 5px
    box-sizing: border-box
    height:40px
    line-height:40px
    background: #fff
    box-shadow: 0 5px 5px 0 #f4f4f4;
    .tab-item
      flex:1
      text-align:center
      & > a
        display:block
        font-size:14px;
        color:rgb(77,85,93)
        &.active
          color:rgb(240,20,20)
          border-bottom: 2px solid #33a3f5;
  .content
   margin-top:45px
</style>
