<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <div class="logo">操作平台</div>
      <saideasd :menus="menus2"></saideasd>
    </el-aside>
    <el-container>
      <el-header
        style="text-align:right; font-size: 12px;line-height: 60px;
;background:rgb(239, 243, 253"
      >
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="sd">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ user }}</span>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import muns from "./Main.js";
export default {
  name: "home",
  components: {
    saideasd: () => {
      return import("../components/menu/siderbar");
    }
  },
  data() {
    return {
      menus2: muns.list,
      user: ""
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user")).name;
  },
  methods: {
    handleCommand(command) {
      console.log(command);
    }
  }
};
</script>
<style scoped lang="scss">
.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  background: #000;
  color: #fff;
}
</style>
