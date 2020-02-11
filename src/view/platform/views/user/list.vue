<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="用户名" v-model="user">
        <el-input />
      </el-form-item>
      <el-form-item>
        <el-button @click="query">查询</el-button>
        <el-button @click="add">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data">
      <el-table-column
        v-for="(item, index) in column"
        v-bind="item"
        :key="index"
      ></el-table-column>
    </el-table>

    <formModal ref="moadls" :formdata="formdata"></formModal>
  </div>
</template>

<script>
import { getHttp } from "@/view/platform/api/http.js";
import formModal from "@/view/platform/components/formModal/formModal";
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
      data: [],

      //   NAME: obj.name,
      //         SEX: obj.sex,
      //         TYPE: obj.type,
      //         EMAIL: obj.email,
      //         // TIME: obj.time,
      //         PHONE: obj.phone,
      //         MAKE: obj.make,
      //         USERNAME: obj.userName,
      //         PASSWORD: obj.password

      formdata: [
        {
          label: "名称",
          pops: "name"
        },
        {
          label: "电话",
          pops: "phone"
        },
        {
          label: "邮箱",
          pops: "email"
        },
        {
          label: "类型",
          pops: "type"
        },
        {
          label: "密码",
          pops: "password"
        },
        {
          label: "备注",
          pops: "make"
        }
      ]
    };
  },
  methods: {
    query() {
      getHttp("USERLIST").then(res => {
        if (res.code === "0000") {
          this.data = res.data;
        }
      });
    },
    add() {
      this.$refs.moadls.show();
    }
  },
  components: { formModal }
};
</script>
