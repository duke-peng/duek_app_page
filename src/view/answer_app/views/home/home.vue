<template>
  <div>
    <mt-swipe :auto="4000" style="height:100px">
      <mt-swipe-item>
        <img src="../../assets/images/1.jpg" class="img" />
      </mt-swipe-item>
      <mt-swipe-item
        ><img src="../../assets/images/2.jpg" class="img"
      /></mt-swipe-item>
      <mt-swipe-item
        ><img src="../../assets/images/3.jpg" class="img"
      /></mt-swipe-item>
    </mt-swipe>
    <ul class="create">
      <li v-for="(item, key) in messnav" :key="key" class="navli">
        {{ item.title }}
      </li>
    </ul>
    <ul class="create navlink">
      <li v-for="(item, key) in messlink" :key="key" @click="navlink(item)">
        <img src="../../assets/images/3.jpg" class="navimg" />
        {{ item.title }}
      </li>
    </ul>
    <div>
      <mt-cell-swipe title="标题文字1" is-link to="/hot"></mt-cell-swipe>
      <mt-cell-swipe title="标题文字2" is-link to="/hot"></mt-cell-swipe>
      <mt-cell-swipe title="标题文字3" is-link to="/hot"></mt-cell-swipe>
    </div>
  </div>
</template>
<script>
// import { Swipe, SwipeItem } from "mint-ui";
export default {
  data() {
    return {
      messnav: [
        {
          title: "技术1"
        },
        {
          title: "技术2"
        },
        {
          title: "技术3"
        },
        {
          title: "技术4"
        }
      ],
      messlink: [
        {
          title: "HTML",
          link: "/anser",
          key: "html"
        },
        {
          title: "JAVASCRIPT",
          link: "/anser",
          key: "javascript"
        },
        {
          title: "CSS",
          link: "/anser",
          key: "css"
        },
        {
          title: "VUE",
          link: "/anser",
          key: "vue"
        },
        {
          title: "WRBPACK",
          link: "/anser",
          key: "webpack"
        },
        {
          title: "随机",
          link: "/anser",
          key: "random"
        }
      ]
    };
  },
  methods: {
    navlink(data) {
      console.log(data);
      this.$router.push({
        path: data.link,
        query: { key: data.key }
      });
    }
  }
};
</script>
<style lang="less">
.navli {
  float: left;
  width: 25%;
  height: 40px;
  list-style: none;
  background: #dce9f5;
  border-radius: 30px;
  text-align: center;
  line-height: 40px;
  color: #ccc;
  margin: 5px 0;
}
.navlink {
  // height: 84px;
  margin-left: -1px;
  padding-bottom: 1px;
}
.navlink li {
  width: 33%;
  height: 80px;
  float: left;
  border: 1px solid #ccc;
  margin-right: -1px;
  margin-bottom: -1px;
  text-align: center;
  // line-height: 80px;
  color: #aaa9af;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.img {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-bottom: 5px;
}
.navimg {
  width: 40px;
  height: 40px;
}
</style>
