import Modal from "@/components/Modal";

declare global {
  declare type GlobalState = {
    common: {
      userInfo: ISmallCamel<API.UserInfo> | undefined,
      /** 牛油果的设置和消耗信息 */
      avoSettings: ISmallCamel<API.AvocadoInfoVM> | undefined,
      token: {
        val: string;
        time: number;
      } | undefined
      themeColor: string
    };
    global: {
      modalMsg: (Modal['state']['msg'] & Partial<Record<'success' | 'cancel' | 'complete', () => void>>) | undefined
    }
  }
}