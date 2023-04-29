import { ConversationStatus, ConversationType } from "@/utils/enum";

declare global {
  namespace API {
    interface CreateConversationVM {
      Title: string;
      ConversationType: ConversationType
      RoleDescription?: string
    }

    interface ConversationStatusVM {
      ConversationId: string
      Status: ConversationStatus
      CheckStatus: number
      UpdateTime: Date
    }

    interface ConversationInfoVM {
      ConversationId: string
      Title: string
      ConversationType: number
      Status: ConversationStatus
      CreateTime: Date
      UpdateTime: Date
      MaxTokenCount: number
      RemainTokenCount: number
      RoleDescription?: string
    
      UserName: string
      Name?: string
      Header?: string
      CheckStatus: number
      //guid,唯一id
      CategoryId: string
      //类目名称
      CategoryName: string
      //点赞数量
      Likes: number
      Favorites: number
      //评论数量
      Comments: number
      Views: number
      MessageCount: number
    
      IsLike: boolean
      IsView: boolean
      IsComment: boolean
      IsFavorite: boolean
      IsAskQuestion: boolean
    
      ShortCode: string
    
      City: string
      Images: string[]
      ImageCount: number
    }

    interface MessageInfoQuery extends BasePageQuery {
      UserName?: string
      ConversationId: string
    }

    interface MessageInfoVM {
      Id: number;
      Index: number
      UserName: string
      ConversationId: string
      MessageId: string
      IsChatGpt: boolean
      Content: string | JSX.Element
      CreateTime: Date
      Status: number
      Name?: string
      Header?: string
      CheckStatus: number
      /**
       * 下面是前端自己的字段
       */
      ErrorCode?: number
      ShowCopy?: boolean
      City: string
    }

    interface SendMessageVM {
      ConversationId: string | null
      Content: string
    }
    
  }
}