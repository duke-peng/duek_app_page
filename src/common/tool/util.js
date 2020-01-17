import Cookie from "js-cookie";
//过滤空数据对象
const filterNull = json => {
  let newJson = {};
  let reg = RegExp(/NaN|undefined|null/);
  for (let li in json) {
    if (json[li] && !reg.test(json[li])) {
      newJson[li] = json[li];
    }
  }
  return newJson;
};
//判断字段空值，空返回0
function isN(res) {
  let res2 = 0;
  //增加判断NaN，但是需要先做转换字符串处理
  if (res === "undefined" || !res || res === "null") {
    return res2;
  } else {
    let na = res.toString();
    res2 = na == "NaN" ? 0 : res;
    return res2;
  }
}
/*数组排序算法
 * 第一个参数：排序的数组
 *第二个参数：根据数组中的哪个字段排序
 * 第三个字段：是升序还是降序，true（升序），false（降序）
 * */
function arrySort(arry, fil, t) {
  //过滤空数组
  //对于 false,null,0,undefiend,NaN直接取!得到的都是true，因此这里只需要在判断空字符串""；
  let arryn = arry.filter(function(val) {
    return !(!val || val === "");
  });

  let condition = function(field, tr) {
    //第二个参数不传递情况下，默认从小到大排序
    if (tr == undefined) {
      tr = -1;
    } else {
      tr = tr ? 1 : -1;
    }
    return function(a, b) {
      a = a[field];
      b = b[field];

      if (a < b) {
        return tr * -1;
      }
      if (a > b) {
        return tr * 1;
      }
      return 0;
    };
  };
  return arryn.sort(condition(fil, t));
}
//时间戳转2018-03-29 12:00:00
function timeStampTurn(obj) {
  var date = new Date(obj);
  var y = 1900 + date.getYear();
  var m = "0" + (date.getMonth() + 1);
  var d = "0" + date.getDate();
  var h = date.getHours() + ":";
  var M = date.getMinutes() + ":";
  var s = date.getSeconds();
  return (
    y +
    "-" +
    m.substring(m.length - 2, m.length) +
    "-" +
    d.substring(d.length - 2, d.length) +
    " " +
    h +
    M +
    s
  );
}
//时间new date()转2018-03-29 12:00:00
const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : "0" + n;
  };

  return [year, month, day, hour, minute, second].map(formatNumber).join("-");
};

//base64转图片下载
function downloadBase64(fileName, content) {
  let aLink = document.createElement("a");
  let blob = base64ToBlob(content); //new Blob([content]);

  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = `${fileName}.jpg`;
  aLink.href = URL.createObjectURL(blob);

  // aLink.dispatchEvent(evt);
  //aLink.click()
  aLink.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window
    })
  ); //兼容火狐
  function base64ToBlob(code) {
    let parts = code.split(";base64,");
    let contentType = parts[0].split(":")[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }
}

//防抖函数：多次触发事件后，事件处理函数只执行一次，并且是在触发操作结束时执行。
//原理：利用js闭包原理。特点在于函数其实需要在刚完成时需要被使用，形成变量赋值给另一个变量，由被赋值的变量进行使用。
/*
 * 传入参数：
 * 1：回调函数
 * 2：延迟时间，默认500,
 * 3：是否立即执行
 * */
const antiShake = function(callback, wait = 500, immediate = true) {
  //定义计时器 ID
  let timeout = null;
  let debounced = function() {
    let self = this;
    //如下为新写法，等同于if为true则执行，类似写法还有三元表达式
    timeout && clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      /*原理：如果不用apply的话会导致函数本身的参数传递无法传递，并且this对象指向不正确
       * apply解析：
       * 这里apply劫持了callback函数
       * 本身retrun function 所对应的对象才是本身的vue对象，但是处于回调中会获取不到。所以
       * 用apply把回调函数的this替换为self，参数（arguments）也正常传递过去
       * */
      if (callNow) callback.apply(self, arguments);
      timeout = setTimeout(
        () => {
          timeout = null;
        }, //见注解
        wait
      );
    } else {
      timeout = setTimeout(() => {
        callback.apply(self, arguments);
      }, wait);
    }
  };
  //取消执行，需要把immediate才有意义
  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
};
// 注解：作为开关变量，表明一个周期结束。使得 callNow 为 true，目标函数可以在新的周期里被触发时被执行
// timeout 作为闭包引用的上层函数的变量，是不会自动回收的。手动将其设置为 null ，让它脱离执行环境，一边垃圾收集器下次运行是将其回收。

/*函数节流
定义：触发函数事件后，短时间间隔内无法连续调用，只有上一次函数执行后，过了规定的时间间隔，才能进行下一次的函数调用。
原理：对处理函数进行延时操作，若设定的延时到来之前，再次触发事件，则清除上一次的延时操作定时器，重新定时。*/
/*参数：
1、回调函数
2、间隔时间
3、设置 options 作为第三个参数，然后根据传的值判断到底哪种效果，约定:
leading：false 表示禁用第一次执行
trailing: false 表示禁用停止触发的回调*/
let throttle = function(func, wait = 500, options) {
  // eslint-disable-next-line no-unused-vars
  let time, context, args, result;
  let previous = 0;
  if (!options) options = {};

  let later = function() {
    previous = options.leading === false ? 0 : new Date().getTime();
    time = null;
    func.apply(context, args);
    if (!time) context = args = null;
  };

  let throttled = function() {
    let now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (time) {
        clearTimeout(time);
        time = null;
      }
      previous = now;
      func.apply(context, args);
      if (!time) context = args = null;
    } else if (!time && options.trailing !== false) {
      time = setTimeout(later, remaining);
    }
  };
  throttled.cancel = function() {
    clearTimeout(time);
    time = null;
    previous = 0;
  };
  return throttled;
};

// 退出
function logout() {
  localStorage.removeItem("user");
  Cookie.remove("user");

  window.location.href = `${process.env.VUE_APP_USER_HOST}/login.html?service=${window.location.href}`;
}

// 登录验证

function checkLogin(to, form, next) {
  let user = Cookie.get("user");
  if (user) {
    next();
  } else {
    logout();
  }
}
export default {
  filterNull,
  isN,
  arrySort,
  timeStampTurn,
  formatTime,
  downloadBase64,
  logout,
  checkLogin,
  antiShake,
  throttle
};
