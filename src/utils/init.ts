import { login } from '@tarojs/taro'
import { loginServe } from '@/serves/common';

export const initLogin = async () => {
  const loginMsg = await login();
  const res = await loginServe({code: loginMsg.code});
  console.log(res);
}