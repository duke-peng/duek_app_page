<template>
  <div>
    <form>
      <ELUpload action="/updata"> <mt-button>上传</mt-button></ELUpload>
    </form>
  </div>
</template>
<script>
import { Upload } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
export default {
  data() {
    return {};
  },
  components: {
    ELUpload: Upload
  }
};
</script>
