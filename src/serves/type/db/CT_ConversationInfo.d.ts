interface CT_ConversationInfo extends BaseModelWithIP {
  Id: number
  /** 用户名 */
  UserName: string
  /** 名称 */
  Name: string
  /** 头像 */
  Header: string
  /** guid,唯一id */
  ConversationId: string
  /** 短id */
  ShortCode: string
  /** 标题 */
  Title: string
  /** 标题 */
  Keywords: string
  /** 最大字数 */
  MaxTokenCount: number
  /** 剩余字数 */
  RemainTokenCount: number
  /** 对话类型 */
  ConversationType: number
  /** 状态 */
  Status: number
  /** chatgpt的描述 */
  RoleDescription: string
  /** 消耗的次数 */
  CountCost: number
  /** 点赞数量 */
  Likes: number
  /** 评论数量 */
  Comments: number
  /** 收藏数量 */
  Favorites: number
  /** 浏览次数 */
  Views: number
  /** 提问数量，不包含回答 */
  MessageCount: number
  /** 审核状态 */
  CheckStatus: number
  /** guid,唯一id */
  CategoryId: string
  /** 类目名称 */
  CategoryName: string
  /** 图片数量 */
  ImageCount: number
  /** 隐私设置 */
  Privacy: ConverstationPrivacy
}
const enum ConverstationPrivacy {
  /** 仅自己可见 */
  Private = 0,
  /** 公共 */
  Public = 1,
}
