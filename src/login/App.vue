<!--通用登录平台 -->
<template>
  <div id="consumer">
    <router-view style="min-height: 100vh;"></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      //   blog: "/dht_blog/index",
      //   platform: "/dht_platform/home",
      //   prefix: ""
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/public.scss";
#consumer {
  font: 14px alpht sans-serif;
  color: $font_main;
}
</style>
