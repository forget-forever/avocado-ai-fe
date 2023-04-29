import { ButtonAsync, PageContainer } from '@/components';
import React, { useMemo, useState } from 'react';
import { AtForm, AtInput } from 'taro-ui';
import classNames from 'classnames';
import { useMemoizedFn } from '@/hooks';
import { bindwxProgramByPhone } from '@/serves/user';
import { showMaskToast, initLogin, showLoading, hideLoading } from '@/utils';
import { navigateBack } from '@/router';
import { to } from 'await-to-js';
import GetVerifyCode from './components/GetVerifyCode';
import { canSubmit } from './util';
import styles from './index.module.scss';

const BindPhone: React.FC = () => {
  // const { openId } = useData((state) => state.common)
  const [ msg, setMsg ] = useState<API.VerifyCodeBindParams>({
    phone: '',
    smsCode: '',
    // openId: openId!
  });
  const isOk = useMemo(() => canSubmit(msg), [msg]);

  /** 现在不支持微信登陆不做了 */
  // const params = useRouterParams('bindPhoneNumber');

  // useEffect(() => {
  //   if (params?.needWxBind) {
  //     actions.modalOption({
  //       title: '绑定提醒',
  //       content: <>
  //         <GetPhone
  //           redirectBindPhone={false}
  //           onSubmit={(res) => {
  //             if (res === 'ok') navigateBack();
  //           }}
  //         >授权登陆</GetPhone>
  //       </>,
  //       hideButton: true,
  //       showClose: true,
  //     });
  //   }
  // }, [params?.needWxBind])

  const submit = useMemoizedFn(async () => {
    await bindwxProgramByPhone(msg);
    showMaskToast('绑定成功');
    showLoading({ title: '开始重新登陆' })
    const [err,] = await to(initLogin())
    if (!err) {
      showMaskToast('登陆成功')
    }
    hideLoading()
    navigateBack()
  })

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
          className={styles.inputItem}
          onChange={(val) => setMsg({...msg, phone: `${val}`})}
        />
        <GetVerifyCode className={styles.inputItem} msg={msg} setMsg={(val) => setMsg(val)} />
        <ButtonAsync
          type='primary'
          className={classNames('width-8', styles.submit)}
          disabled={!isOk}
          onClick={submit}
        >
          确定
        </ButtonAsync>
        {/* <View className={styles.wxLogin}>
          <GetPhone
            className={styles.getPhone}
            redirectBindPhone={false}
            onSubmit={(res) => {
              if (res === 'ok') {
                navigateBack()
              }
            }}
            describe=''
          >
            <Text style={{ color: '#24dc5a', fontSize: '24px' }} className='iconfont icon-weixin'></Text>
            &nbsp;&nbsp;<Text className={styles.wxLoginButton}>微信登陆</Text>
          </GetPhone>
        </View> */}
      </AtForm>
    </PageContainer>
  )
}

export default BindPhone;