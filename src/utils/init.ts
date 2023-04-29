import { login } from '@tarojs/taro'
import { loginServe } from '@/serves/common';
import { actions } from '@/store';
import { getLocalStorage } from '@/utils'
import { PlatformType } from './enum';
// import { showModal } from '@/components/Modal/options';

export const initLogin = async () => {
  const loginMsg = await login();
  const inviteCode = getLocalStorage('inviteCode') || undefined
  try {
    const res = await loginServe({code: loginMsg.code, platformType: PlatformType.WxMiniProgram, referCode: inviteCode});
    actions.setToken({ token: res });
  } catch (err) {
    console.error('登录失败了', err)
  }
}

export const initH5 = () => {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js';
  document.head.appendChild(script);    
}