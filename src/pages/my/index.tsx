import Modal from "@/components/Modal"
import { showModal } from "@/components/Modal/options"
import { useEffect } from "react"
import { AtAvatar } from "taro-ui"
import ListItem from "./components/ListItem"

export default () => {
  // const data = useData((state) => {
  //   return state.common
  // })
  useEffect(() => {
    setTimeout(() => {
      showModal({title: 'test', content: 'data.openId' })
    }, 2000);
  })
  return <>
    <AtAvatar>
    </AtAvatar>
    <ListItem />
  </>
}