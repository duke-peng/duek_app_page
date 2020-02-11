<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          :label="item.label"
          :prop="item.prop"
          v-for="(item, key) in formdata"
          :key="key"
        >
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: true,
      ruleForm: {
        name: "12"
      }
    };
  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    handleClose() {}
  },
  props: {
    formdata: {
      type: Array
    }
  }
};
</script>
