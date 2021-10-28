import { login } from '@tarojs/taro'
import { loginServe } from '@/serves/common';
import { projectType } from './utils';

type IRes = PromiseReturn<typeof loginServe>
export const initLogin = async () => {
  const loginMsg = await login();
  try {
    const res = await loginServe({code: loginMsg.code});
    // res.data.
  } catch (err) {
    if (projectType<IRes>(err, (e) => !!(e as IRes)?.data.openId)) {
      const { data } = err;
      console.log(data.openId);
      // err.
    }
  }
  
}