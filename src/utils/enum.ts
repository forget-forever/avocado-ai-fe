/* eslint-disable no-shadow */
export enum GenderEnum {
  male = 1,
  female,
  unknown
}
export enum PlatformType {
  WxMiniProgram = 1, //	微信小程序
  QQMiniProgram, //	QQ小程序
  WxPublicAccount, //	微信公众号
  Website, //	网页
  AndroidApp, //	安卓app
  IosApp, //	Ios App
}
export enum ContentType {
  contactInfo = 1, //	联系方式
  moment = 2, //	动态
}
// 账号类型
export enum UserType {
  normal = 1,
  admin = 2
}
// 账号状态
export enum UserStatus {
  normal = 1, // 正常， 审核通过就是这个状态
  banned, // 封禁
  checking, // 审核中
  checkFailed // 审核失败
}
// 绑定状态
export enum BindStatus {
  binding = 1,
  unbind
}
export enum DomainType {
  phone = 1, //	手机号
  wechat,	// 微信
  qq, //	QQ
  weibo, //	微博
  tiktok, //	抖音
  email, //	邮箱
  other, //	其他
}

// 投放的盲盒状态
export enum BlindBox {
  checking = 1,	//审核中
  checkFailed, //	审核失败
  waitingGet, //	等待被抽取
  beGot, //已经被抽取
}

// 剩余次数的类型
export enum ChanceType {
  get = 1, // 抽取
  post = 2 // 投送
}

// 改变的机会类型
export enum ChangeChanceType {
  cost = 1, // 消耗次数
  get // 的到次数
}

// 为什么回改变拥有的机会 
export enum ChangeReasonEnum {
  userUseGet = 1, //	用户消费(获取),可能是签到或者说活动中获取的
  userUsePost, //	用户消费(发布)，发布一些内容获取的
  purchase, // 购买
  advertisement, //	观看广告
}

// 发送验证码的场景
export enum SmsCodeUseType {
  wxBind = 1
}