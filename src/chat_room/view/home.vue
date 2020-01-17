<template>
  <div>
    <!-- <mt-header fixed :title="title"></mt-header> -->

    <mt-header :title="title" fixed>
      <i class="iconfont iconjiahaocu" slot="right" @click="addRoom"> </i>
    </mt-header>
    <div style="display: flex">
      <img src="../assets/images/woman.png" />
      <mt-cell-swipe
        class="chatlist"
        title="大厅"
        @click.native="goChitchat('lobby')"
      >
      </mt-cell-swipe>
    </div>

    <div v-for="(item, key) in list" :key="key" style="display: flex">
      <img src="../assets/images/woman.png" />
      <mt-cell-swipe
        class="chatlist"
        :title="item.title"
        @click.native="goChitchat(item, key)"
        label=""
        :right="[
          {
            content: '删除',
            style: { background: '#ccc', color: 'rgb(251, 113, 113)' },
            handler: () => $messagebox('delete')
          }
        ]"
      >
      </mt-cell-swipe>
    </div>
  </div>
</template>
<script>
import Cookie from "js-cookie";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      popupVisible: true,
      title: "聊天室",
      list: [
        // {
        //   title: "进入大厅",
        //   link: "lobby5"
        // },
        // {
        //   title: "进入大厅1",
        //   link: "lobby1"
        // },
        // {
        //   title: "进入大厅1",
        //   link: "lobby1"
        // }
      ]
    };
  },
  methods: {
    // 进入大厅
    getInit() {
      let user = Cookie.user;
      if (!user) {
        MessageBox.prompt("使用游客身份登录！请输入姓名！").then(
          ({ value }) => {
            if (value) {
              this.$router.push({
                path: "/room",
                query: { user: value }
              });
            }
          }
        );
      } else {
        this.$router.push({
          path: "/room"
        });
      }
    },
    goChitchat(item, key) {
      if (item === "lobby") {
        this.getInit();
        return;
      }

      // 私密聊天 发送密码验证
      MessageBox.prompt("请输入聊天室密码", "添加聊天室").then(
        ({ value, action }) => {
          if (action == "confirm") {
            this.$socket.emit("verify", { password: value, key });
          }
        }
      );
    },
    // 增加聊天室
    addRoom() {
      MessageBox.prompt("请输入聊天室密码", "添加聊天室").then(
        ({ value, action }) => {
          if (action == "confirm") {
            this.$socket.emit("addroom", {
              subscribe: false,
              password: value
            });
          }
        }
      );
    }
  },
  sockets: {
    addroom(data) {
      console.log(data);
      this.list = data;
    },
    verify(data) {
      if (data.state) {
        this.$router.push({
          path: "/privacyroom",
          query: {
            ...data,
            user: Cookie.get("user")
          }
        });
      }
    }
  },
  created() {
    this.$socket.emit("addroom");
  }
};
</script>
<style lang="less" scoped>
.chatlist {
  width: 100%;
  border-bottom: 1px solid #ccc;
}
img {
  width: 40px;
  height: 40px;
  margin: 5px;
}
</style>
