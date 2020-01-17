<template>
  <div>
    <el-form :inline="true">
      <!-- <el-form-item label="题目ID">
        <el-input v-model="queryData.id" />
      </el-form-item> -->
      <el-form-item label="题目类型">
        <el-select v-model="queryData.type" clearable>
          <el-option value="1" label="选择题"></el-option>
          <el-option value="2" label="判断题"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题目属性" clearable>
        <el-select v-model="queryData.bigType">
          <el-option
            :value="item.value"
            :label="item.label"
            v-for="(item, key) in bigType"
            :key="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="query({ pageNo: 1, pageSize: 10 })">查询</el-button>
        <el-button @click="add">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data" height="600">
      <el-table-column
        v-for="(item, index) in column"
        v-bind="item"
        :key="index"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)">编辑</el-button>
          <el-button @click="deletes(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      :page-size="queryData.pageSize"
      @current-change="current"
    ></el-pagination>
    <el-dialog title="标题" :visible.sync="open">
      <el-form label-width="80px">
        <el-form-item label="类型">
          <el-select v-model="params.type">
            <el-option value="1" label="选择题"></el-option>
            <el-option value="2" label="判断题"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="属性">
          <el-select v-model="params.bigType">
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="(item, key) in bigType"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="params.title" />
        </el-form-item>
        <el-form-item label="题目">
          <el-input type="textarea" v-model="params.selectAll" />
        </el-form-item>
        <el-form-item label="答案">
          <el-input v-model="params.anserName" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="params.make" />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" v-if="openType == 'add'" @click="addok"
          >确定</el-button
        >
        <el-button type="primary" v-else @click="editok">确定</el-button>
        <el-button @click="open = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getHttp, postHttp } from "@/platform/api/http.js";

export default {
  data() {
    return {
      open: false,
      queryData: {
        id: "",
        type: "",
        bigType: "",
        pageNo: "1",
        pageSize: 10
      },
      openType: "add",
      params: {
        title: "",
        type: "",
        selectAll: "",
        anserName: "",
        anser: "",
        make: "",
        bigType: ""
      },
      column: [
        {
          label: "题目id",
          prop: "id"
        },
        {
          label: "类型",
          prop: "type",
          formatter(row) {
            console.log(row);
            let type = "";
            switch (row.type) {
              case "1":
                type = "选择题";
                break;
              case "2":
                type = "判断题";
                break;
              default:
                break;
            }
            return type;
          }
        },
        {
          label: "属性",
          prop: "bigType"
          // formatter(row) {
          //   console.log(row);
          //   let type = "";
          //   switch (row.bigType) {
          //     case "1":
          //       type = "java";
          //       break;
          //     case "2":
          //       type = "HTML";
          //       break;
          //     case "3":
          //       type = "JS";
          //       break;
          //     default:
          //       break;
          //   }
          //   return type;
          // }
        },
        {
          label: "标题",
          prop: "title"
        },
        {
          label: "选项",
          prop: "selectAll"
        },
        {
          label: "答案",
          prop: "anserName"
        },

        {
          label: "备注",
          prop: "make"
        }
      ],
      data: [],
      total: 0,
      bigType: [
        {
          value: "java",
          label: "java"
        },
        {
          value: "html",
          label: "html"
        },
        {
          value: "javascript",
          label: "javascript"
        },
        {
          value: "webpack",
          label: "webpack"
        },
        {
          value: "vue",
          label: "vue"
        }
      ]
    };
  },
  methods: {
    query(param) {
      let params = Object.assign({}, this.queryData, param);
      getHttp("QUESTTIONLIST", params).then(res => {
        if (res.code === "0000") {
          this.data = res.data;
          this.total = res.total;
        }
      });
    },
    //新增
    add() {
      this.params = {
        title: "",
        type: "",
        selectAll: "",
        anserName: "",
        make: "",
        bigType: ""
      };
      this.openType = "add";
      this.open = true;
    },
    addok() {
      postHttp("QUESTTIONADD", this.params).then(res => {
        if (res.code === "0000") {
          this.open = false;
          this.query();
        }
      });
    },
    edit(row) {
      console.log(row);
      this.open = true;
      this.openType = "edit";
      this.params = row;
    },
    editok() {
      postHttp("QUESTTIONEDIT", this.params).then(res => {
        if (res.code === "0000") {
          this.open = false;
          this.query();
        }
      });
    },
    deletes(row) {
      this.$confirm("此操作将永久删除文件，是否继续？", "提示", {
        type: "warning"
      }).then(() => {
        console.log(row.id);
        getHttp("QUESTTIONDELETE", { id: row.id }).then(res => {
          if (res.code === "0000") {
            this.open = false;
            this.query();
          }
        });
      });
    },
    // 分页
    current(pageNo) {
      console.log(pageNo);
      this.query({ pageNo });
    }
  }
};
</script>
