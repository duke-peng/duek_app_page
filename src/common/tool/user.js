import Cookie from "js-cookie";

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

export default { logout, checkLogin };
