import { ButtonAsync, PageContainer, TitleDesc } from "@/components"
import { useMemoizedFn } from "@/hooks";
import { navigate } from "@/router";
import { createConversation } from "@/serves";
import { actions } from "@/store";
import { invalidFunc } from "@/utils";
import { View } from "@tarojs/components";
import { to } from "await-to-js";
import classNames from "classnames";
import dayjs from "dayjs";
import useForm from 'rc-form-hooks'
import { AtDivider, AtForm, AtTextarea } from "taro-ui";

import styles from './index.module.scss'

const now = dayjs().format('YYYY-MM-DD HH:mm')

const CreateCommunication: React.FC = () => {
  const { getFieldDecorator, validateFields } = useForm<ISmallCamel<API.CreateConversationVM>>()

  const submitHandle = useMemoizedFn(async () => {
    const [err, val] = await to(validateFields())
    if (err) {
      actions.showErrorToast(err)
    } else {
      const chatCode = await createConversation(val!)
      navigate('chat', {
        params: {chatCode}
      })
    }
  })

  return <PageContainer title='创建对话'>
    <AtForm className='hidden'>
      <TitleDesc className='margin-top'>对话标题</TitleDesc>
      {
        getFieldDecorator('title', {
          initialValue: `个人对话 ${now}`,
          rules: [
            { required: true, message: '请输入对话标题！' }
          ]
        })(<AtTextarea
          value=''
          onChange={invalidFunc}
          placeholder='请输入对话标题'
          maxLength={50}
          className='no-border'
        />)
      }
      <AtDivider className='width-9' />
      <TitleDesc className='margin-top'>角色描述</TitleDesc>
      {
        getFieldDecorator('roleDescription', {
          initialValue: '你是一个十分智能的助手',
          rules: [
            { required: true, message: '请输入ChatGPT角色描述！' }
          ]
        })(<AtTextarea
          value=''
          onChange={invalidFunc}
          placeholder='请输入ChatGPT角色描述'
          maxLength={200}
          className='no-border'
        />)
      }
    </AtForm>
    <View className={classNames('width-95 margin-top', styles.tip)}>
      <View>
        ChatGPT会根据聊天上下文和用户进行的角色描述进行回答，为了更加精确的回答您的问题，您可以开启一个新的对话，并尽可能的描述您需要的角色信息。
      </View>
      <View className='text-red'>
        最好描述ChatGPT的角色，不指定角色的话ChatGPT会根据聊天上下文自动分析。
      </View>
    </View>
    <ButtonAsync type='primary' className='width-8 margin-top' onClick={submitHandle}>
      创建会话
    </ButtonAsync>
  </PageContainer>
}

export default CreateCommunication;