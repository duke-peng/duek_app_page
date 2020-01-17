<template>
  <div id="login">
    <el-form class="loginFrom" :model="logindata" :rules="rules" ref="ruleForm">
      <el-form-item class="login-item">
        <h1 class="login-title">登录中心</h1>
      </el-form-item>
      <el-form-item prop="userName" class="form-item">
        <el-input
          class="login-inputorbuttom"
          prefix-icon="el-icon-user"
          placeholder="登录名"
          v-model="logindata.userName"
          width="60%"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" class="form-item">
        <el-input
          class="login-inputorbuttom"
          prefix-icon="el-icon-lock"
          placeholder="密码"
          v-model="logindata.password"
        ></el-input>
      </el-form-item>
      <!--<el-form-item prop="verificationCode">
        <el-input
          class="login-inputorbuttom"
          v-model="logindata.verificationCode"
        ></el-input>
      </el-form-item>-->
      <el-form-item class="login-item">
        <div v-show="open" class="msg">
          用户名或密码错误
        </div>
        <el-button
          class="login-inputorbuttom login-bottom"
          type="primary"
          v-popover:popover
          @click="loginInit"
          >登 录</el-button
        >
      </el-form-item>
    </el-form>
    <!--验证码弹窗-->
    <el-popover
      popper-class="slidingPictures"
      ref="popover"
      trigger="manual"
      v-model="visible"
    >
      <div class="sliding-pictures">
        <div class="vimg">
          <canvas id="sliderBlock"></canvas>
          <canvas id="codeImg"></canvas>
        </div>
        <div class="slider">
          <div class="track" :class="{ pintuTrue: puzzle }">
            {{ tips }}
          </div>
          <div class="button el-icon-s-grid" @mousedown.prevent="drag"></div>
        </div>
        <div class="operation">
          <span
            title="关闭验证码"
            @click="visible = false"
            class="el-icon-circle-close"
          ></span>
          <span
            title="刷新验证码"
            @click="canvasInit"
            class="el-icon-refresh-left"
          ></span>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
import axios from "axios";
import Cookie from "js-cookie";
export default {
  name: "login",
  data() {
    return {
      tips: "拖动左边滑块完成上方拼图",
      logindata: {
        userName: "王小二",
        password: "",
        verificationCode: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" }
        ]
      },
      visible: false,
      //滑块x轴数据
      slider: {
        mx: 0,
        bx: 0
      },
      //拼图是否正确
      puzzle: false,
      open: false
    };
  },
  watch: {
    visible(e) {
      if (e === true) {
        this.canvasInit();
        this.puzzle = false;
      }
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    //拼图验证码初始化
    canvasInit() {
      //生成指定区间的随机数
      const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };
      //x: 254, y: 109
      let mx = random(127, 244),
        bx = random(10, 128),
        y = random(10, 99);

      this.slider = { mx, bx };

      this.draw(mx, bx, y);
    },
    //鼠标按下
    drag(e) {
      console.log("鼠标按下", e);
      let dom = e.target; //dom元素
      let slider = document.querySelector("#sliderBlock"); //滑块dom
      const downCoordinate = { x: e.x, y: e.y };

      //正确的滑块数据
      let checkx = Number(this.slider.mx) - Number(this.slider.bx);
      //x轴数据
      let x = 0;
      const move = moveEV => {
        x = moveEV.x - downCoordinate.x;
        //y = moveEV.y - downCoordinate.y;
        if (x >= 251 || x <= 0) return false;
        dom.style.left = x + "px";
        //dom.style.top = y + "px";
        slider.style.left = x + "px";
      };

      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        dom.style.left = "";

        console.log(x, checkx);
        let max = checkx - 5;
        let min = checkx - 10;
        //允许正负误差1
        if ((max >= x && x >= min) || x === checkx) {
          console.log("滑动解锁成功");
          this.puzzle = true;
          this.tips = "验证成功";
          setTimeout(() => {
            this.visible = false;
          }, 500);
        } else {
          console.log("拼图位置不正确");
          this.tips = "验证失败，请重试";
          this.puzzle = false;
          this.canvasInit();
        }
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },
    draw(mx = 200, bx = 20, y = 50) {
      let mainDom = document.querySelector("#codeImg");
      let bg = mainDom.getContext("2d");
      let width = mainDom.width;
      let height = mainDom.height;

      let blockDom = document.querySelector("#sliderBlock");
      let block = blockDom.getContext("2d");
      //重新赋值，让canvas进行重新绘制
      blockDom.height = height;
      mainDom.height = height;

      let imgsrc = require("../assets/images/back.jpg");
      let img = document.createElement("img");
      img.style.objectFit = "scale-down";
      img.src = imgsrc;
      img.onload = function() {
        bg.drawImage(img, 0, 0, width, height);
        block.drawImage(img, 0, 0, width, height);
      };

      let mainxy = { x: mx, y: y, r: 9 };
      let blockxy = { x: bx, y: y, r: 9 };
      this.drawBlock(bg, mainxy, "fill");
      this.drawBlock(block, blockxy, "clip");
    },
    //绘制拼图
    drawBlock(ctx, xy = { x: 254, y: 109, r: 9 }, type) {
      let x = xy.x,
        y = xy.y,
        r = xy.r,
        w = 40;
      let PI = Math.PI;
      //绘制
      ctx.beginPath();
      //left
      ctx.moveTo(x, y);
      //top
      ctx.arc(x + (w + 5) / 2, y, r, -PI, 0, true);
      ctx.lineTo(x + w + 5, y);
      //right
      ctx.arc(x + w + 5, y + w / 2, r, 1.5 * PI, 0.5 * PI, false);
      ctx.lineTo(x + w + 5, y + w);
      //bottom
      ctx.arc(x + (w + 5) / 2, y + w, r, 0, PI, false);
      ctx.lineTo(x, y + w);
      ctx.arc(x, y + w / 2, r, 0.5 * PI, 1.5 * PI, true);
      ctx.lineTo(x, y);
      //修饰，没有会看不出效果
      ctx.lineWidth = 1;
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.stroke();
      ctx[type]();
      ctx.globalCompositeOperation = "xor";
    },
    // 登录
    async loginInit() {
      console.log(1212);

      let state = await this.$refs.ruleForm.validate().catch(() => false);
      console.log(state, "state");
      if (state) {
        console.log("yan");
        // this.visible = true;
        let path = window.location.search;
        path = path.split("?service=")[1] || "";
        await axios.post("/users/login", this.logindata).then(res => {
          if (res.data.code === "0000") {
            this.open = false;
            console.log(res.data.data[0]);
            Cookie.set("user", res.data.data[0].userName);
            localStorage.setItem("user", JSON.stringify(res.data.data[0]));
            window.location.href = path;
          } else {
            this.open = true;
          }
        });
      } else {
        console.log(state);
        this.open = false;
      }
    }
  }
};
</script>
<style>
.slidingPictures {
  padding: 0;
  width: 300px;
  border-radius: 2px;
}
</style>
<style scoped lang="scss">
#login {
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/images/login.jpg");
  background-size: 100% 100%;
  .loginFrom {
    width: 300px;
    .login-item {
      display: flex;
      justify-content: center;
      align-items: center;
      .msg {
        height: 30px;
        color: #f56c6c;
        position: absolute;
        top: -40px;
      }
    }
    .form-item {
      height: 60px;
    }
    .login-title {
      color: #ffffff;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .login-bottom {
      // margin-top: 15px;
    }
    .login-bottom:hover {
      background: rgba(28, 136, 188, 0.5);
    }
    .login-bottom:active {
      background: rgba(228, 199, 200, 0.5);
    }
    /deep/.login-inputorbuttom {
      height: 40px;
      width: 300px;
      background: rgba(57, 108, 158, 0.5);
      border-radius: 20px;
      border: #396c9e 1px solid;
      font-size: 14px;
      color: #ffffff;
      outline: none;
      .el-input--small,
      .el-input__inner {
        line-height: 43px;
        border: none;
        color: #ffffff;
        font-size: 14px;
        height: 40px;
        border-radius: 20px;
        background: transparent;
        text-align: center;
        width: 100%;
        outline: none;
      }
      .el-input__icon {
        line-height: 40px;
        font-size: 16px;
      }
    }
  }
}
/*该样式最终是以弹窗插入*/
.sliding-pictures {
  width: 100%;
  .vimg {
    width: 100%;
    height: 170px;
    #codeImg,
    #sliderBlock {
      padding: 7px 7px 0 7px;
      width: inherit;
      height: inherit;
    }
    #codeImg {
      //display: none;
    }
    #sliderBlock {
      position: absolute;
      z-index: 4000;
    }
  }
  .slider {
    width: 100%;
    height: 65px;
    border-bottom: #c7c9d0 1px solid;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .track {
      margin-left: 7px;
      width: 286px;
      height: 38px;
      background: rgba(28, 136, 188, 0.5);
      border-radius: 25px;
      font-size: 14px;
      line-height: 38px;
      padding-right: 15px;
      padding-left: 70px;
    }
    .pintuTrue {
      background: #67c23a;
      color: #ffffff;
    }
    .button {
      position: absolute;
      width: 50px;
      height: 50px;
      line-height: 48px;
      background: #ffffff;
      box-shadow: #b9bdc8 0 0 3px;
      border-radius: 50%;
      left: 7px;
      text-align: center;
      font-size: 28px;
      color: #3e5d8b;
      &:hover {
        color: #2181bd;
      }
    }
  }
  .operation {
    width: 100%;
    height: 40px;
    > span {
      color: #9fa3ac;
      display: inline-block;
      width: 40px;
      font-size: 25px;
      line-height: 40px;
      text-align: center;
      &:hover {
        background: #e2e8f5;
      }
    }
  }
}
</style>
