export enum GenderEnum {
  /** 男 */
  male = 1,
  /** 女 */
  female,
  /** 保密 */
  secret
}
export enum PlatformType {
  /** 网页 */
  Website = 0,
  /** 微信小程序 */
  WxMiniProgram = 1,
  /** QQ小程序 */
  QQMiniProgram,
  /** 微信公众号 */
  WxPublicAccount,
  /** 安卓app */
  AndroidApp,
  /** Ios App */
  IosApp,
}
export enum ContentType {
  /** 联系方式 */
  contactInfo = 1,
  /** 动态 */
  moment = 2,
}
/** 绑定状态 */
export enum BindStatus {
  binding = 1,
  unbind
}
export enum DomainType {
  /** 手机号 */
  phone = 1,
  /** 微信 */
  wechat,
  /** QQ */
  qq,
  /** 微博 */
  weibo,
  /** 抖音 */
  tiktok,
  /** 邮箱 */
  email,
  /** 其他 */
  other,
}

/** 投放的盲盒状态 */
export enum BlindBox {
  /** 审核中 */
  checking = 1,
  /** 审核失败 */
  checkFailed,
  /** 等待被抽取 */
  waitingGet,
  /** 已经被抽取 */
  beGot,
}

/** 改变的机会类型 */
export enum ChangeChanceType {
  /** 消耗次数 */
  cost = 1,
  /** 得到次数 */
  get
}

/** 为什么回改变拥有的机会 */
export enum ChangeReasonEnum {
  /** 用户消费(获取),可能是签到或者说活动中获取的 */
  userUseGet = 1,
  /** 用户消费(发布)，发布一些内容获取的 */
  userUsePost,
  /** 购买 */
  purchase,
  /** 观看广告 */
  advertisement,
}

/**  发送验证码的场景 */
export enum SmsCodeUseType {
  wxBind = 1
}

export enum UserTypeEnum {
  /** 普通 */
  general = 1,
}

export enum UserStatusEnum {
  /** 正常， 审核通过就是这个状态 */
  normal = 1,
  /** 封禁 */
  banned,
  /** 审核中 */
  checking,
  /**  审核失败 */
  checkFailed
}

export const getSourceTypeText = (sourceType: number) => {
  if (sourceType >= 1 && sourceType <= 10) {
    return '对话提醒'
  }
  if (sourceType >= 20 && sourceType <= 30) {
    return '订单提醒'
  }
  if (sourceType >= 61 && sourceType <= 80) {
    return '话题提醒'
  }
  if (sourceType === 41) {
    return '登录提醒'
  }
  return '通用提醒'
}

export const getSourceTypeBgColor = (sourceType: ReturnType<typeof getSourceTypeText>) => {
  switch (sourceType) {
    case '对话提醒':
      return 'var(--red)';
    case '订单提醒':
      return 'var(--blue)';
    case '话题提醒':
      return 'var(--green)';
    case '登录提醒':
      return 'var(--orange)';
    default:
      return 'var(--black)';
  }
}

export const enum ConversationCheckStatus {
  Checking = 0,
  Failed = 1,
  Successful = 2,
}

export const enum ConversationType {
  /** 聊天模式 */
  Chat = 1,
  /** 社区 */
  Public = 2,
  /** AI绘图 */
  AiDrawing = 3,
}
export const enum ConversationStatus {
  /** 目前无执行中的任务，可以执行操作 */
  NoAction = 1,
  /** 等待执行 */
  Waiting = 2,
  /** 执行中 */
  Running = 3,
  /** 执行成功 */
  RunningSuccess = 4,
  /** 执行失败 */
  RunningFailed = 5,
}

export const RestroreFacesOptions = [
  {
    label: '默认',
    value: 0,
  },
  {
    label: '细致化脸部',
    value: 1,
  },
]