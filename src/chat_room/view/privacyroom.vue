<template>
  <div style="height:100%">
    <mt-header fixed title="固定在顶部" style="z-index:99">
      <router-link to="/" slot="left">
        <mt-button icon="back" style="color:#fff">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="body">
      <div v-for="(item, key) in data" :key="key">
        <div class="title" v-if="item.type == 2">{{ item.title }}</div>
        <msgList
          :data="item"
          v-else
          :algin="item.name == $route.query.user ? 'right' : 'left'"
        />
      </div>
    </div>
    <div class="footer">
      <div class="footer_main">
        <input class="footer_input" v-model="value" />
        <div class="footer_button" @click="getrun">发送</div>
      </div>
    </div>
  </div>
</template>
<script>
import msgList from "../component/msgList";
export default {
  components: { msgList },
  data() {
    return {
      data: [
        // { name: "张三", value: "nihao" },
        // { name: "李四", value: "nihao" },
        // { name: "小明", value: "nihao" }
      ],
      value: "",
      time: ""
    };
  },
  methods: {
    getrun() {
      this.$socket.emit("privacyRoom", {
        name: this.$route.query.user,
        value: this.value,
        time: this.time
      });
      this.value = "";
    }
  },
  created() {
    this.$socket.emit("privacyRoom", {
      subscribe: false,
      user: this.$route.query.user,
      time: this.this.$route.time
    });
    this.time = this.$route.query.time;
  },
  sockets: {
    // 通过vue实例对象sockets实现组件中的事件监听
    connect: function() {
      // socket的connect事件
      console.log("socket connected from Page");
    },
    loginprivacy(data) {
      // 后端按主题名推送的消息数据
      this.data.push({ title: data, type: 2 });
    },
    privacyRoom(data) {
      console.log(data);
      this.data.push(data);
    }
  }
};
</script>
<style lang="less" scoped>
.body {
  width: 100%;
  padding: 40px 0;
}

.footer {
  position: fixed;
  z-index: 99;
  bottom: 0;
  width: 100%;
  height: 40px;
  left: 0;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  .footer_main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 94%;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 15px;
    position: absolute;
    background: #fff;
    .footer_input {
      width: 80%;
      height: 100%;
      border: 0;
      margin-left: 13px;
      outline: none;
      color: #787e8add;
    }
    .footer_button {
      width: 20%;
      text-align: center;
      height: 30px;
      line-height: 30px;
    }
    .footer_button:active {
      color: #26a2ff;
    }
  }
}
.title {
  width: 90%;
  text-align: center;
  height: 22px;
  background: #ccc;
  margin: 10px auto;
  line-height: 22px;
  color: #fff;
  border-radius: 5px;
}
</style>
