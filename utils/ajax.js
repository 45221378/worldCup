import axios from 'axios';
import { shim } from 'promise.prototype.finally';
import { Toast } from 'antd-mobile';
import baseURL from './config';
import qs from 'qs';
import _store from '../index';
shim();

const ajax = axios.create({
  baseURL,
  timeout: 1000 * 120,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [
    function(data) {
      return qs.stringify(data);
    },
  ],
});
ajax.interceptors.request.use(
  function(config) {
    Toast.loading('正在加载', 0);

    let { data = {}, params = {}, method } = config;

    const store = _store.getState();
    const {
      urlInfo: { mobile },
    } = store;
    if (method === 'post') {
      data = Object.assign({}, data, { mobile });
    } else if (method === 'get') {
      params = Object.assign({}, params, { mobile });
    }

    return {
      ...config,
      data,
      params,
    };
  },
  function(error) {
    // 对请求错误做些什么
    Toast.hide();
    return Promise.reject(error);
  }
);

ajax.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    let { head, body } = response.data;
    Toast.hide();

    if (head.retCode === 'success') {
      return body;
    } else {
      const { msg } = head;
      Toast.info(msg);
      return Promise.reject(head);
    }
  },
  function(error) {
    Toast.hide();
    const { response, request } = error;
    if (response) {
      const {
        data: { head },
      } = response;
      const { status } = request;

      if (head) {
        Toast.info(head.msg);
      } else {
        Toast.offline(`${status}:网络连接失败`);
      }
      return Promise.reject(error);
    } else {
      Toast.offline(`网络连接失败`);
      return Promise.reject({});
    }
  }
);
export { baseURL };
export default ajax;
