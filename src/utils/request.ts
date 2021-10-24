import { General } from "@tarojs/taro";
import { showMaskToast, toBigCamel, toSmallCamel } from "./utils";

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
  const { data, statusCode } = err
  if (statusCode) {
    const errorText = data.message || codeMessage[statusCode];
    return Promise.reject(new Error(errorText));
  }
  return Promise.reject(new Error('网络异常'));
};

/**
 * 自己handle的错误
 */
const errorHandlerSelf = (err: Taro.request.SuccessCallbackResult<IResponseData<unknown>>) => {
  switch (+err.data.data.code) {
    case 10000: 
    return Promise.reject(new Error('未登录'));
    case 10001:
      return Promise.reject(new Error('访问频繁'));
    case 10002:
      return Promise.reject(new Error(err.data.message));
    default:
  }
  return Promise.reject(err.data);
}

type ICamelType = 'big' | 'small'
/**
 * 配置request请求时的默认参数
 */
type IResponseData<T = any> = {
  isSuccess: boolean;
  message: string;
  stackTrace: string;
  data: {
    code: number;
    data: T;
  }
};
type IOptions<U extends any, C extends ICamelType> = {
  method?: keyof Taro.request.method;
  // @ts-ignore
  data?: C extends 'big' ? IBigCamel<U> : U;
  header?: General.IAnyObject;
  paramsToBigCamel?: C extends 'big' ? true : false;
}

/**
 * 对接口的返回值进行二次的封装
 * */
const request = async <T = any, U = any, C extends ICamelType = 'big', E = never>(url: string, options: IOptions<U, C> = {}) => {
  const { paramsToBigCamel = true, data: params } = options;

  try {
    const res = await Taro.request<IResponseData<T> & E, U>({
      url,
      method: options?.method || 'GET',
      // @ts-ignore
      data: paramsToBigCamel ? toBigCamel(params || {}) : params,
      header: {
        ...options?.header
      },
    });
    const {data, statusCode} = res;
    const resData = toSmallCamel(data);
    if(+statusCode <= 300 || +statusCode === 304) {
      if (resData.isSuccess) {
        return resData.data
      } else {
        return Promise.reject(errorHandlerSelf(res))
      }
    } else {
      return Promise.reject(errorHandler(res))
    }
  } catch (error) {
    showMaskToast('网络异常')
    return Promise.reject(new Error('网络异常'))
  }
};

// export const requestSmallCamel = () => {

// }
export default request;
