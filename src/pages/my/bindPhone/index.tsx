import { PageContainer } from '@/components/index';
import { system } from '@/utils/config';
import { Button } from '@tarojs/components';
import React, { useState } from 'react';
import { AtForm, AtInput } from 'taro-ui';
import GetVerifyCode from './components/GetVerifyCode';
import { canSubmit } from './util';

const BindPhone: React.FC = () => {
  const [ msg, setMsg ] = useState<IRequest.User.VerifyCodeBindParams>({phone: '', verifyCode: ''});

  return (
    <PageContainer title='绑定手机'>
      <AtForm customStyle={{padding: '20px 0', height: `calc(100vh - ${system.customHeight}px)`}}>
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
        <Button type='primary' className='width-8' style={{marginTop: '60px'}} disabled={canSubmit(msg)}>确定</Button>
      </AtForm>
    </PageContainer>
  )
}

export default BindPhone;