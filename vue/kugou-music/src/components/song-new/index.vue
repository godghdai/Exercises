<template>
<div>
    <slider ref="slider">

  <div> <a href="javascript:;" class="js-downloadApp">
            <img src="http://m.kugou.com/v3/static/images/index/banner.jpg" onerror="this.onerror=null;this.src='http://m.kugou.com/v3/static/images/index/ban.jpg';" alt=""/>
          </a></div>
  <div><a href="http://sdn.kugou.com/link.aspx?id=56129&dl=1" target="_blank">
              <img src="http://imge.kugou.com/mobilebanner/20171029/20171029231520435854.jpg" onerror="this.onerror=null;this.src='http://m.kugou.com/v3/static/images/index/ban.jpg';" />
            </a></div>
  <div> <a href="http://sdn.kugou.com/link.aspx?id=56767&dl=1" target="_blank">
              <img src="http://imge.kugou.com/mobilebanner/20171030/20171030171352903777.jpg" onerror="this.onerror=null;this.src='http://m.kugou.com/v3/static/images/index/ban.jpg';" />
            </a></div>
  <div> <a href="http://m.kugou.com/plist/list/129535" target="_blank">
              <img src="http://imge.kugou.com/mobilebanner/20171030/20171030175740707777.jpg" onerror="this.onerror=null;this.src='http://m.kugou.com/v3/static/images/index/ban.jpg';" />
            </a></div>
  <div>   <a href="http://sdn.kugou.com/link.aspx?id=55226&dl=1" target="_blank">
              <img src="http://imge.kugou.com/mobilebanner/20171029/20171029002227562932.jpg" onerror="this.onerror=null;this.src='http://m.kugou.com/v3/static/images/index/ban.jpg';" />
            </a></div>

</slider>

<div>
  <span @click="itemclick(12)">庄心妍 - 梦诛缘·忆暖冬</span>
</div>
<div>
  <span @click="itemclick(13)">汪苏泷 - 火星研究院【火星研究院综艺主题曲】</span>
</div>
</div>


</template>

<script>
import Slider from 'base/slider';
export default {
  name: 'singer',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  components: {
      Slider
  },
  activated() {
    setTimeout(() => {
      this.$refs.slider && this.$refs.slider.refresh();
    }, 20);
  },
  methods: {
  itemclick: function (id) {
    this.$router.push({name: 'songListDetail', params: { id }});
    }
}
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 .wrap
   img
     width:100%

</style>
