<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="用户名" v-model="user">
        <el-input />
      </el-form-item>
      <el-form-item>
        <el-button @click="query">查询</el-button>
        <el-button>新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data">
      <el-table-column
        v-for="(item, index) in column"
        v-bind="item"
        :key="index"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getHttp } from "@/platform/api/http.js";

export default {
  data() {
    return {
      user: "",
      column: [
        {
          label: "名称",
          prop: "name"
        },
        {
          label: "性别",
          prop: "sex"
        },
        {
          label: "账号类别",
          prop: "type"
        },
        {
          label: "密码",
          prop: "password"
        },
        {
          label: "日期",
          prop: "time"
        },
        {
          label: "电话",
          prop: "phone"
        },
        {
          label: "邮箱",
          prop: "email"
        },

        {
          label: "备注",
          prop: "make"
        }
      ],
      data: []
    };
  },
  methods: {
    query() {
      getHttp("USERLIST").then(res => {
        if (res.code === "0000") {
          this.data = res.data;
        }
      });
    }
  }
};
</script>
