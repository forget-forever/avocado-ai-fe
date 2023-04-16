import { ButtonAsync, Card, Logo, PageContainer, TitleDesc } from "@/components"
import { AtTextarea } from "taro-ui";
import useForm from 'rc-form-hooks';
import { invalidFunc } from "@/utils";
import { useData } from "@/hooks";
import { actions } from "@/store";
import { signToday } from "@/serves";
import { navigateBack } from "@/router";

const SignIn: React.FC = () => {
  const { getFieldDecorator, values } = useForm<API.SignVM>()

  const { signGet } = useData((s) => s.common.avoSettings) || {}

  return <PageContainer className='text-secondary'>
    <Card title='今天有什么想法说的' className='margin-top'>
      { getFieldDecorator('Note', {
      })(<AtTextarea value='' onChange={invalidFunc} />) }
    </Card>
    <TitleDesc className='flex align-items'>
      每日签到可获得{signGet}<Logo />
    </TitleDesc>
    <ButtonAsync
      showToast='提交中'
      type='primary'
      className='width-8'
      onClick={() => {
        if (!values.Note) {
          actions.modalOption({
            title: '提示',
            content: '说点什么东西再提交吧',
            hidePassiveButton: true,
            positiveText: '我知道了'
          })
          return undefined
        } else {
          return signToday(values as Required<typeof values>).then(async () => {
            await actions.getUserInfo()
            navigateBack()
          })
        }
      }}
    >
      提交
    </ButtonAsync>
  </PageContainer>
}

export default SignIn;