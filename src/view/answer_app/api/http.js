import axios from "axios";
import path from "./path/index.js";
const http = axios;

http.interceptors.response.use(response => {
  console.log(response);
  return response.data;
});

export function Http(method, baseurl, params) {
  return http({
    method: method,
    url: path[baseurl],
    data: params
  });
}

export function postHttp(baseurl, params) {
  return http({
    method: "post",
    url: path[baseurl],
    data: params
  });
}

export function getHttp(baseurl, params) {
  console.log(path[baseurl]);
  return http({
    method: "get",
    url: path[baseurl],
    params
  });
}

// export default http;
