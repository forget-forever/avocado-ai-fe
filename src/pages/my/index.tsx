import { Card, ListItem, PageContainer, OpenButton } from "@/components"
import { ProFile } from '@/pages/components'
import { navigate } from "@/router"
import { actions } from "@/store"
import { useDidShow } from "@tarojs/taro"
import { useRequest } from "taro-hooks"
import { AtIcon, AtList, AtListItem } from "taro-ui"

export default () => {

  const { data, run: refresh } = useRequest(async () => {
    actions.getUserInfo()
    const res = await actions.checkStatus()
    return res
  }, { manual: true })

  useDidShow(() => {
    refresh()
  })

  const { hasUnreadNotification } = data || {}
 
  return <PageContainer title='个人中心' hideBack>
    <ProFile exTraDom={<ProFile.SignIn />} className='sticky'>
      <ProFile.RemainInfo />
    </ProFile>
    <Card title='我的' className='margin-top'>
      <AtList hasBorder={false}>
        <ListItem
          dot={hasUnreadNotification}
          iconNode={<AtIcon value='bell' />}
          onClick={() => navigate('messageNotice')}
        >
          消息通知
        </ListItem>
        <OpenButton openType='share' nostyle>
          <ListItem icon='icon-liwu1'>邀请用户</ListItem>
        </OpenButton>
        <AtListItem
          iconInfo={{ value: 'none', className: 'iconfont icon-changyongxinxi'}}
          title='我的信息'
          arrow='right'
          onClick={() => navigate('userinfo')}
        />
        <AtListItem
          iconInfo={{ value: 'none', className: 'iconfont icon-quanxian'}}
          title='获得的授权'
          arrow='right'
          onClick={() => navigate('onwerShip')}
          hasBorder={false}
        />
      </AtList>
    </Card>
    <Card title='其他' className='margin-top'>
      <AtList hasBorder={false}>
        <AtListItem
          iconInfo={{ value: 'none', className: 'iconfont icon-niuyouguo'}}
          title='牛油果帮助'
          arrow='right'
          onClick={() => navigate('helpCenter')}
        />
        <OpenButton openType='feedback' nostyle>
          <ListItem icon='icon-31wentifankui'>反馈bug/改进建议</ListItem>
        </OpenButton>
        <AtListItem
          iconInfo={{ value: 'none', className: 'iconfont icon-qianshuxieyi'}}
          title='服务条款与隐私协议'
          arrow='right'
          hasBorder={false}
          onClick={() => navigate('privacy')}
        />
      </AtList>
    </Card>
  </PageContainer>
}