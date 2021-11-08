import { IRouterMap } from "@/router/routerMap";
import { useRouter } from "@tarojs/taro";

const useRouterParams = <K extends (keyof IRouterMap)>() => {
  const router = useRouter()
  return router.params as IRouterMap[K];
}

export default useRouterParams;