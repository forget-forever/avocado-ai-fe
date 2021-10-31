import { MyRadio, PageContainer } from "@/components/index";
import GetPhone from "@/components/GetPhone";
import { actions } from "@/store";
import useData from "@/utils/hooks/useData";
import { useEffect } from "react";
import { GenderEnum } from "@/utils/enum";

const Post: React.FC = () => {
  const { token } = useData((state) => state.common)
  useEffect(() => {
    if(!token) {
      actions.modalOption({
        title: '绑定提醒',
        content: <>尚未绑定个人信息，没有绑定个人信息的时，无法将自己的信息放入盲盒。<GetPhone /></>,
        hideButton: true,
        closeOnClickOverlay: false,
      })
    }
  }, [token])

  return <PageContainer title='期待缘分与你相遇'>
    <MyRadio
      options={[
        {value: GenderEnum.male, label: '男'},
        {value: GenderEnum.female, label: '女'}
      ]}
      style={{width: '60%', justifyContent: 'space-around', margin: '20px auto'}}
    />
  </PageContainer>
}
export default Post;
