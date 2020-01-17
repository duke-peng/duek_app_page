<template>
  <div class="main">
    <div class="router">
      <router-view></router-view>
    </div>
    <mt-tabbar v-model="selected" style="position: fixed;bottom: 0;">
      <mt-tab-item
        v-for="(item, key) in routerLink"
        :key="key"
        :id="item.id"
        @click.native="tablink(item)"
      >
        <img slot="icon" />
        {{ item.title }}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "聊天室",
      selected: "tab-container1",
      routerLink: [
        {
          id: "tab-container1",
          link: "/chatlist",
          title: "聊天室",
          icon: ""
        },
        {
          id: "tab-container2",
          link: "/friend",
          title: "好友",
          icon: ""
        },
        {
          id: "tab-container3",
          link: "/hot",
          title: "发现",
          icon: ""
        },
        {
          id: "tab-container4",
          link: "/my",
          title: "我的",
          icon: ""
        }
      ]
    };
  },
  methods: {
    tablink(item) {
      console.log(1212);
      this.$router.push({ path: item.link });
      this.title = item.title;
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  .router {
    // height: 100%;
    padding: 40px 0;
  }
}
</style>
