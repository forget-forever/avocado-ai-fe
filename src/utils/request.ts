import { General } from "@tarojs/taro";
import { showMaskToast } from "./utils";

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
const errorHandler = (err: Taro.request.SuccessCallbackResult<IResponseData<unknown>>) => {
  const { data,statusCode } = err
  if (statusCode) {
    const errorText = data.errmsg || codeMessage[statusCode];
    return Promise.reject(new Error(errorText));
  }
  return Promise.reject(new Error('网络异常'));
};

/**
 * 自己handle的错误
 */
const errorHandlerSelf = (_err: Taro.request.SuccessCallbackResult<IResponseData<unknown>>) => {
  return new Error('')
}

/**
 * 配置request请求时的默认参数
 */
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
type IOptions<U extends string | General.IAnyObject | ArrayBuffer> = {
  method?: keyof Taro.request.method,
  data?: U,
  header?: General.IAnyObject
}

/**
 * 对接口的返回值进行二次的封装
 * */
export const request = async <T = never, U = undefined, E = never>(url: string, options: IOptions<U> = {}) => {
  try {
    const res = await Taro.request<IResponseData<T> & E, U>({
      url, //仅为示例，并非真实接口地址。
      method: options?.method || 'GET',
      data: options?.data,
      header: {
        ...options?.header
      },
    });
    const {data, statusCode} = res;
    if(+statusCode <= 300 || +statusCode === 304) {
      if (+data.err_no === 0) {
        return data
      } else {
        return errorHandlerSelf(res)
      }
    } else {
      return errorHandler(res)
    }
  } catch (error) {
    showMaskToast('网络异常')
    return new Error('')
  }
};

export const requestSmallCamel = () => {

}
// export default request;
