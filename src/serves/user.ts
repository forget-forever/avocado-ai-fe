import { request } from "@/utils";

export const sendVerifyCodeByOpenId = (data: API.SendVerifyCodeParams) => request<{}>(
  '/User/Account/SendSmsCodeByOpenId',
  {
    method: 'POST',
    data
  }
);

export const bindwxProgramByPhone = (data: API.VerifyCodeBindParams) => request<{}, {result: API.BindPhoneRes}>(
  '/User/Account/BindWxMiniProgramByPhone',
  {
    method: 'POST',
    data
  }
);