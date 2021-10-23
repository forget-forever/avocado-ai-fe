import { login } from '@tarojs/taro'

export const initLogin = () => {
  login({
    success: (res) => {
      console.log(`login code: ${res.code}`);
    }
  });
}