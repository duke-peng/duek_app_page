<template>
  <div>
    <ul
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="loading"
      infinite-scroll-distance="100"
    >
      <li
        v-for="(item, key) in list"
        :key="key"
        style="height:80px"
        @click="getRoute(item.node)"
      >
        <a class="link" :href="item.node.originalUrl"> {{ item.node.title }}</a>
      </li>
    </ul>
    <!-- <mt-popup
      v-model="popupVisible"
      position="right"
      style="width: 100%;
      height: 100%;"
    >
      <mt-header :title="title">
        <div slot="left" @click="close">
          返回
        </div>
      </mt-header>
      <iframe class="iframeTab"></iframe>
    </mt-popup> -->
  </div>
</template>
<script>
import { postHttp, getHttp } from "../../api/http";

export default {
  data() {
    return {
      list: [],
      loading: false,
      after: "",
      popupVisible: false,
      title: "ccccccc"
    };
  },
  methods: {
    query() {
      let param = {
        operationName: "",
        query: "",
        variables: { first: 20, after: "", order: "POPULAR" },
        extensions: { query: { id: "21207e9ddb1de777adeaca7a2fb38030" } }
      };
      getHttp("HOTQUERYLIST").then(res => {
        console.log(res);
        this.list = res.data.edges;
        this.after = res.data.endCursor;
      });
    },
    loadMore() {
      this.loading = true;

      getHttp("HOTQUERYLIST", { after: this.after }).then(res => {
        console.log(res.data.result);

        this.list = this.list.concat(res.data.edges);
        this.after = res.data.endCursor;
        this.loading = false;
      });
    },
    getRoute(row) {
      // this.$router.push({
      //   path: "/hot/details",
      //   query: {
      //     id: row.id
      //   }
      // });
    },
    close() {}
  },
  created() {
    this.query();
  }
};
</script>
