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
      /** 用户的手机号，脱敏 */
      PhoneMask: string;
      /** 邮箱，脱敏 */
      EmailMask: string;
      /** 最后登陆时间 */
      LastLogin: string;
      /**  */
      IsSignToday: boolean;
      ChangedProfile: boolean;
      PublishedConversation: boolean;
    };
    
    type ILoginParams = {
       /** 登陆code */
       Code: string
       /** 邀请码 */
       ReferCode?: string
       /** 平台 */
       PlatformType: number
    }
    type ILoginRes = string;
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
    interface AvocadoInfoVM {
      /// <summary>
      /// 话题获得一个点赞的奖励次数
      /// </summary>
      ConversationLikeGet: number
      RegisterGet: number
      /// <summary>
      /// 每日签到的奖励次数
      /// </summary>
      SignGet: number
      /// <summary>
      /// 邀请用户获得的次数
      /// </summary>
      InviteUserGet: number
      /// <summary>
      /// 对话提问的消耗次数
      /// </summary>
      ChatMessageCost: number
      /// <summary>
      /// 创建话题消耗的次数
      /// </summary>
      CreateConversationCost: number
      /// <summary>
      /// 话题提问消耗的次数
      /// </summary>
      ConversationQuestionCost: number
      /// <summary>
      /// 话题评论消耗的次数
      /// </summary>
      ConversationCommentCost: number
      //首次发布话题的奖励
      FisrtPublicConversationGet: number
      //购买ai绘图原图
      BuyAiDrawingPicture: number
      //获取无水印内容
      GetContentWithoutWatermark: number
      //修改照片
      RepairPicture: number
      //去除图片背景
      RemoveBg: number
      //关注微信公众号
      FollowWxOfficialAccount: number
    }    
  }
}
