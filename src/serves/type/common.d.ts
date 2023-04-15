import { UserStatusEnum, UserTypeEnum } from "@/utils/enum"

declare global {
  namespace API {
    type UserInfo = {
      /** 用户名 */
      UserName: string;
      /** 用户类型 */
      UserType: UserTypeEnum;
      /** 用户状态 */
      UserStatus: UserStatusEnum;
      Name: string;
      Header: string;
      UsedCount: number;
      RemainCount: number;
      /** 邀请码 */
      InviteCode: string;
      /** 邀请人数 */
      InviteCount: number;
      /** 绑定了手机 */
      PhoneStatus: boolean;
      /** 绑定了邮箱 */
      EmailStatus: boolean;
      /** 用户的手机号，加敏 */
      PhoneMask: string;
      /** 邮箱，加敏 */
      EmailMask: string;
      /** 最后登陆时间 */
      LastLogin: string;
      /**  */
      IsSignToday: boolean;
      ChangedProfile: boolean;
      PublishedConversation: boolean;
    };
    
    type ILoginParams = {
      code: string
    }
    type ILoginRes = {
      Token: string;
      UserInfo: UserInfo;
      OpenId: string;
    }
    type BindPhoneParams = {
      rawData: {
        encryptedData: string;
        iv:	string;
        cloudID?: string;
      }
      openId: string;
    }
    type BindPhoneRes =  {
      UserName: string;
      Phone: string;
      Name: string;
      Gender: number;
      HeaderPic: string;
      UserType: number;
      UserStatus: number;
      Description: string;
      Photos: string;
      Country: string;
      Province: string;
      City: string;
      District: string;
      Birthday: string;
      UpdateTime: IDateTime;
      CreateTime: IDateTime;
    }
  }
}
