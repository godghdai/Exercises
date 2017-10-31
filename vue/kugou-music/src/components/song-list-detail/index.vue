<template>
  <div> <h1>歌单详情</h1><br/>User {{ $route.params.id }}</div>
</template>

<script>
export default {
  name: 'singer',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 div
  background:red
  height:100%


</style>

