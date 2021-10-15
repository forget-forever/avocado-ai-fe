/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import type { RequestOptionsInit } from 'umi-request';
import { extend } from 'umi-request';
import { notification } from 'antd';
// import { stringify } from 'querystring';

const codeMessage = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    return Promise.reject(new Error(errorText));
  }
  return Promise.reject(new Error('网络异常'));
};

/**
 * 配置request请求时的默认参数
 */
const extendedrequest = extend({
  getResponse: true, // 获取源数据
  credentials: 'include', // 默认请求是否带上cookie
});
type IResponseData<T = any> = {
  errno: number;
  errmsg: string;
  error_no: number;
  error_msg: string;
  err_msg: string;
  url: string;
  data: T;
  err_no: number;
};

/**
 * 对接口的返回值进行二次的封装
 * */
const request = <T = any>(url: string, options?: RequestOptionsInit, selfError?: boolean) => {
  return extendedrequest<IResponseData<T>>(url, options)
    .then((res) => {
      const { response, data } = res;
      const { status } = response;
      if ((status >= 200 && status < 300) || status === 304) {
        if (+data.errno === 0) {
          return data.data;
        }
        // 未登录的状态处理
        if (+data.err_no === -1) {
          window.location.href = '/datamap/login';
          return Promise.reject(new Error(data.err_msg));
        }
        // if (selfError) {
        //   return Promise.reject(data)
        // }
        // return errorHandler(res);
      }
      if (selfError) {
        return Promise.reject(res);
      }
      return errorHandler(res);
    })
    .catch((err) => {
      notification.error({
        message: err.message || '未知错误',
        description: err.message,
      });
      if (selfError) {
        return Promise.reject(err);
      }
      return Promise.reject(err.message);
    });
};
export default request;
