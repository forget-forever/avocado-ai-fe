// import { GenderEnum } from "./enum";

// declare global {
  declare type IStorage = Partial<{
    /** 用户的登录的信息，有openid和token */
    info: {
      openId: GlobalState['common']['openId']
      token: GlobalState['common']['token'];
    }
    userInfo: GlobalState['common']['userInfo']
  }>
// }