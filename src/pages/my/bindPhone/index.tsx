import { MyButton, PageContainer } from '@/components/index';
import React, { useState } from 'react';
import { AtForm, AtInput } from 'taro-ui';
import GetVerifyCode from './components/GetVerifyCode';
import { canSubmit } from './util';

const BindPhone: React.FC = () => {
  const [ msg, setMsg ] = useState<IRequest.VerifyCodeBindParams>({phone: '', verifyCode: ''});

  return (
    <PageContainer title='绑定手机'>
      <AtForm customStyle={{padding: '20px 0', height: '100%'}}>
        <AtInput
          name='phone'
          type='phone'
          title='手机号码'
          placeholder='请输入手机号码'
          value={msg?.phone}
          border
          onChange={(val) => setMsg({...msg, phone: `${val}`})}
        />
        <GetVerifyCode msg={msg} setMsg={(val) => setMsg(val)} />
        <MyButton type='primary' className='width-8' style={{marginTop: '60px'}} disabled={canSubmit(msg)}>确定</MyButton>
      </AtForm>
    </PageContainer>
  )
}

export default BindPhone;