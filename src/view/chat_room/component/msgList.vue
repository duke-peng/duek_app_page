<template>
  <div>
    <div
      style="display: flex;margin:5px 0;flex-direction: row-reverse;"
      v-if="algin == 'right'"
    >
      <img :src="my" style="width:40px;height:40px;margin:0 5px" />
      <div
        style="display: flex;flex-direction:column;justify-content: space-between"
      >
        <div style="color:#ccc ;text-align:right">{{ data.name || "" }}</div>
        <div class="mainLiright" v-if="data.value">
          <div></div>
          <p>
            {{ data.value || "" }}
          </p>
        </div>
      </div>
    </div>
    <div style="display: flex;margin:5px 0" v-else>
      <img :src="tourist" style="width:40px;height:40px;margin:0 5px" />
      <div
        style="display: flex;flex-direction:column;justify-content: space-between"
      >
        <div style="color:#ccc">{{ data.name || "" }}</div>
        <div class="mainLi" v-if="data.value">
          <div></div>
          <p>
            {{ data.value || "" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      man: require("../assets/images/man.png"),
      woman: require("../assets/images/woman.png"),
      tourist: require("../assets/images/tourist.png"),
      my: require("../assets/images/my.png")
    };
  },
  methods: {},
  props: ["algin", "data"]
};
</script>
<style lang="less" scoped>
.main_value {
  height: 100%;
  max-width: 90%;
  position: absolute;
  z-index: inherit;
}
.mainLi {
  padding: 5px;
  max-width: 90%;
  margin: 5px 0 0 5px;
  position: relative;
  border: 1px solid #ccc;

  &:after {
    content: "";
    display: block;
    width: 5px;
    height: 5px;
    border: 1px solid #ccc;
    position: absolute;
    left: -4px;
    top: 10px;
    background: #fff;
    transform: rotate(45deg);
  }
  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
  }
  p {
    background: #fff;
    position: relative;
    z-index: 5;
    left: 0;
    top: 0;
  }
  div {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 3;
    background: #fff;
    left: 0;
    top: 0;
  }
}

.mainLiright {
  padding: 5px;
  max-width: 90%;
  margin: 5px 5px 0 5px;
  position: relative;
  border: 1px solid #ccc;

  &:after {
    content: "";
    display: block;
    width: 5px;
    height: 5px;
    border: 1px solid #ccc;
    position: absolute;
    right: -4px;
    top: 10px;
    background: #fff;
    transform: rotate(45deg);
  }
  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
  }
  p {
    background: #fff;
    position: relative;
    z-index: 5;
    left: 0;
    top: 0;
  }
  div {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 3;
    background: #fff;
    left: 0;
    top: 0;
  }
}
</style>
