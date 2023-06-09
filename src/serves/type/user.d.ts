import { SmsCodeUseType } from "@/utils/enum"

declare global {
  declare namespace API {
    type SendVerifyCodeParams = {
      phone: string;
      userType: SmsCodeUseType;
      // openId: string;
    }
    type VerifyCodeBindParams = {
      phone: string,
      smsCode: string,
      // openId: string
    }

    type SignVM = {
      Note: string
    }

    type NotificationQuery = ISmallCamel<{
      IsRead?: boolean
      Page: number
      Limit: number
    }>

    interface NotificationInfoVM {
      Id: number
      UserName: string
      NotificationId: string
      Content: string
      Title: string
      IsRead: boolean
      SourceType: number
      SourceCode?: string
      ReadTime?: Date
      CreateTime: Date
    }

    /** */
    interface UserStatusVM {
      //UnreadNotificationCount: number
      HasUnreadNotification: boolean
      HasUnpaidOrder: boolean
      //ConversationInfo: ConversationInfoVM | null
    }
  }
}