// import { GenderEnum } from "./enum";

// declare global {
  declare type IStorage = Partial<{
    /** 用户的登录的信息，有token */
    info: {
      token: GlobalState['common']['token'];
    }
    userInfo: GlobalState['common']['userInfo'];
  } & InviteCodeType>

  declare type InviteCodeType = {
    /** 邀请人的邀请码 */
    inviteCode?: string
  }
// }
