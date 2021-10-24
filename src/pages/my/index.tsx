import useData from "@/utils/hooks/useData"
import { Text } from "@tarojs/components"
import { AtAvatar } from "taro-ui"
import ListItem from "./components/ListItem"

export default () => {
  const data = useData((state) => {
    return state.common
  })
  return <>
    <AtAvatar>
    </AtAvatar>
    <Text>{data.a}</Text>
    <ListItem />
  </>
}