<template>
  <div>
    <h3>酒店模块首页</h3>
    <div id="container"></div> 
    </div>
</template>

<script>
export default {
  mounted(){
      window.onLoad  = function(){
        var map = new AMap.Map('container');
      }
      var url = 'https://webapi.amap.com/maps?v=1.4.15&key=7bc7263f6c1c367a8caee1ec6a9c56a1&callback=onLoad';
      var jsapi = document.createElement('script');
      jsapi.charset = 'utf-8';
      jsapi.src = url;
      document.head.appendChild(jsapi); 
  }
}
</script>

<style scoped>

  #container {width:400px; height: 400px; } 
</style>