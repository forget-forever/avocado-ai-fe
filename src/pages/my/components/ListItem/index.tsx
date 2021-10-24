import useData from "@/utils/hooks/useData";
import { Button } from "@tarojs/components";
import { setState } from "@/store";

export default () => {
  const data = useData((state) => {
    return state.common
  })
  return <>
    <Button onClick={() => {
      setState('common', {a: data.a + 10})
    }}
    >按钮</Button>
  </>
}