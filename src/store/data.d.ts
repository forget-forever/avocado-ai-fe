declare type GlobalState = {
  common: {
    userInfo: ISmallCamel<IRequest.Common.ILoginRes['UserInfo']> | undefined,
    openId: string | undefined,
  };
  glopbal: {
    c: boolean;
    d: number;
  }
}