interface CommentBaseInfoVM {
  CommentId: string
  Id: number
  /// <summary>
  /// 用户名
  /// </summary>
  UserName: string
  /// <summary>
  /// 名称
  /// </summary>
  Name: string
  /// <summary>
  /// 头像
  /// </summary>
  Header: string
  /// <summary>
  /// 用户名
  /// </summary>
  ReplyToUserName: string
  /// <summary>
  /// 名称
  /// </summary>
  ReplyToName: string
  /// <summary>
  /// 头像
  /// </summary>
  ReplyToHeader: string
  /// <summary>
  /// 评论内容
  /// </summary>
  Content: string
  /// <summary>
  /// guid,唯一id
  /// </summary>
  ConversationId: string
  //状态
  Status: number
  CheckStatus: number
  CreateTime: Date
  City: string
}
