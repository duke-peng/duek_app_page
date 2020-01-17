<template>
  <div class="details_hot">
    <mt-header fixed :title="title">
      <div slot="left" @click="goBlack">
        返回
      </div>
    </mt-header>
    <object class="iframeTab" :data="src"></object>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "xxx",
      src: ""
    };
  },
  methods: {
    goBlack() {
      this.$router.go(-1);
    }
  },
  created() {
    let id = this.$route.query.id;
    this.src = "https://juejin.im/post/" + id;
  }
};
</script>
<style lang="less" scoped>
.details_hot {
  height: 100%;
  .iframeTab {
    width: 100%;
    height: 100%;
    border: 0;
  }
}
</style>
