import { login } from '@tarojs/taro'
import { loginServe } from '@/serves/common';
import { actions, setState } from '@/store';
import { projectType } from './utils';

type IRes = PromiseReturn<typeof loginServe>
export const initLogin = async () => {
  const loginMsg = await login();
  try {
    const {data} = await loginServe({code: loginMsg.code});
    const { userInfo, openId } = data
    setState('common', { userInfo, openId})
    // res.data.
  } catch (err) {
    if (projectType<IRes>(err, (e) => !!(e as IRes)?.data.openId)) {
      const { data } = err;
      actions.setOpenId(data.openId)
      // setTimeout(() => {
      //   actions.modalOption({title: 'test', content: data.openId, buttonType: '' })
      // }, 2000);
    }
  }
  
}