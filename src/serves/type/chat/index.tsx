import { ConversationType } from "@/utils/enum";

declare global {
  namespace API {
    interface CreateConversationVM {
      Title: string;
      ConversationType: ConversationType
      RoleDescription?: string
    }
  }
}