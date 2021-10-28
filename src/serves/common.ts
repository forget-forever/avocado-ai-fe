import { request } from "@/utils/request";

export const loginServe = (params: IRequest.Common.ILoginParams) => request<IRequest.Common.ILoginRes>('/User/Account/WxMiniProgramLogin', {
  data: params,
  paramsToBigCamel: false
})