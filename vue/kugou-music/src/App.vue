<template>
  <div id="app">
   <keep-alive>
      <router-view></router-view>
   </keep-alive>
   </div>
</template>

<script>

export default {
  data() {
    return {
      seller: {}
    };
  },
  created() {
     // this.$http.get('/api/seller').then((response) => {
     //    response = response.body;
     //    if (response.errno === ERR_OK) {
     //      this.seller = Object.assign({}, this.seller, response.data);
     //      console.log(this.seller);
     //    }
     //  });
  },
  components: {
   // 'v-header': header
  }
};
</script>
<style type="text/css">
  .d{
    position: relative;
    box-sizing: border-box;
  }
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
 #app
   height:100%
   width:100%
</style>
