import GetPhone from "@/components/GetPhone";
import Modal from "@/components/Modal";
import PageContainer from "@/components/PageContainer";
import { bindWxPhone } from "@/serves/common";
import { actions } from "@/store";
import useData from "@/utils/hooks/useData";
import { initLogin } from "@/utils/init";
import { View } from "@tarojs/components";
import { createRef, useEffect } from "react";

const Post: React.FC = () => {
  const modal = createRef<Modal>();
  const { token, openId } = useData((state) => state.common)
  // const getPhoneNumber = 
  // const bindPhone = async ()
  useEffect(() => {
    if(!token) {
    actions.modalOption({
      title: '绑定提醒',
      content: <>
        尚未绑定个人信息，没有绑定个人信息的时，无法将自己的信息放入盲盒。
        <GetPhone onSubmit={async ({detail}) => {
            const { iv, errMsg, encryptedData, cloudId } = detail as (typeof detail) & {cloudId?: string} ;
            if(errMsg.includes(':ok')) {
              const {result} = await bindWxPhone({
                rawData: {iv, encryptedData, cloudID: cloudId},
                openId: openId!,
              })
              if (result) {
                await initLogin()
              }
            } else {
              
            }
          }}
        />
      </>,
      hideButton: true,
      closeOnClickOverlay: false,
    })
    }
  }, [modal, openId, token])

  return <PageContainer title='期待缘分与你相遇'>
    {/* <Modal ref={modal} /> */}
    <View>aaaa</View>
  </PageContainer>
}
export default Post;
