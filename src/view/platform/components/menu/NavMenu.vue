<template>
  <div class="navMenu">
    <label v-for="(navMenu, key) in navMenus" :key="key">
      <!--只有一级菜单-->
      <el-menu-item
        v-if="
          navMenu.childs == null &&
            navMenu.entity &&
            navMenu.entity.state === 'ENABLE'
        "
        :key="navMenu.entity.id"
        :data="navMenu"
        :index="navMenu.entity.name"
        :route="navMenu.entity.value"
      >
        <!--图标-->
        <i :class="navMenu.entity.icon"></i>
        <!--标题-->
        <span slot="title">{{ navMenu.entity.alias }}</span>
      </el-menu-item>
      <!--有多级菜单-->
      <el-submenu
        v-if="
          navMenu.childs && navMenu.entity && navMenu.entity.state === 'ENABLE'
        "
        :key="navMenu.entity.id"
        :data="navMenu"
        :index="navMenu.entity.name"
      >
        <template slot="title">
          <i :class="navMenu.entity.icon"></i>
          <span> {{ navMenu.entity.alias }}</span>
        </template>
        <!--递归组件，把遍历的值传回子组件，完成递归调用-->
        <nav-menu :navMenus="navMenu.childs"></nav-menu>
      </el-submenu>
    </label>
  </div>
</template>

<script>
export default {
  name: "NavMenu", //使用递归组件必须要有
  props: ["navMenus"], // 传入子组件的数据
  data() {
    return {};
  },
  methods: {}
};
</script>
