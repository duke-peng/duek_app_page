<template>
  <div>
    <mt-header title="多个按钮">
      <template slot="left">
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </template>
    </mt-header>
    <div v-for="(item, key) in anserdata" :key="key">
      <mt-radio
        :title="key + 1 + ': ' + item.title"
        v-model="value[key]"
        @click.native="run()"
        :options="formatarr(item)"
        v-show="open == key"
      >
      </mt-radio>
      <mt-cell
        title="答案"
        v-show="open == key && anseropen"
        :label="item.anser"
      ></mt-cell>
    </div>
    <div class="run">
      <mt-button size="normal" type="primary" @click="last">上一页</mt-button>
      <mt-button size="normal" type="primary" @click="next" v-if="nextopen"
        >下一页</mt-button
      >
      <mt-button size="normal" type="primary" @click="updata" v-else
        >提交</mt-button
      >
      <mt-button size="normal" type="primary" @click="look">查看</mt-button>
    </div>
  </div>
</template>
<script>
import { getHttp } from "../../api/http";
export default {
  data() {
    return {
      anserdata: [],
      value: {},
      open: 0,
      anseropen: false
      // alphabet: ["A", "B", "C", "D", "E", "F"]
    };
  },
  methods: {
    query() {
      getHttp("ANSERLIST").then(res => {
        console.log(res);
        this.anserdata = res.data;
      });
    },
    // 按照类型查找
    queryType(param) {
      getHttp("QUERYBIGTYPE", param).then(res => {
        this.anserdata = res.data;
      });
    },
    formatarr(item) {
      let data = item.selectAll.split(",");
      // data.forEach((element, index) => {
      //   data[index] = this.alphabet[index] + ": " + element;
      // });
      return data;
    },
    run() {
      console.log("sdsd");
    },
    last() {
      if (this.open) {
        this.open--;
      }
    },
    next() {
      if (this.open < this.anserdata.length - 1) {
        this.open++;
      }
    },
    updata() {},
    look() {
      this.anseropen = !this.anseropen;
    }
  },
  computed: {
    nextopen() {
      return this.open < this.anserdata.length - 1;
    }
  },
  created() {
    console.log(this.$route.query.key);
    if (this.$route.query.key == "random") {
      this.query();
    } else {
      this.queryType(this.$route.query);
    }
    // ;
  }
};
</script>
<style scoped>
.run {
  display: flex;
  justify-content: space-around;
  position: absolute;
  width: 100%;
  bottom: 10px;
}
</style>
