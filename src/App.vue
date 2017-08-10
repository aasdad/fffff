<template>
  <div id="app">
        <!--<keep-alive >
           <router-view  v-if="!$route.meta.notKeepAlive"></router-view>
        </keep-alive>  -->
           <router-view  class="router-view"></router-view>
  </div>
</template>
<script>
import Home from "./components/home.vue";
export default {
  name: 'app',
  data () {
  	 return {
  	 	
  	 }
  },
  components:{
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color:#fbf9fe;
  margin:0;
  padding:0;
  width:100%;
  height:100%;
}
</style>
