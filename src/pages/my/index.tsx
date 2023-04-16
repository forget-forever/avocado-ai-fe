import { Card, PageContainer } from "@/components"
import { ProFile } from '@/pages/components'
import { navigate } from "@/router"
import { AtList, AtListItem } from "taro-ui"

export default () => {
 
  return <PageContainer title='个人中心' hideBack>
    <ProFile exTraDom={<ProFile.SignIn />} className='sticky'>
      <ProFile.RemainInfo />
    </ProFile>
    <Card title='我的' className='margin-top'>
      <AtList hasBorder={false}>
        <AtListItem
          iconInfo={{ value: 'bell'}}
          title='消息通知'
          arrow='right'
          onClick={() => navigate('messageNotice')}
        />
        <AtListItem
          iconInfo={{ value: 'none', className: 'iconfont icon-liwu1'}}
          title='邀请用户'
          arrow='right'
        />
        <AtListItem
          iconInfo={{ value: 'none', className: 'iconfont icon-changyongxinxi'}}
          title='我的信息'
          arrow='right'
        />
        <AtListItem
          iconInfo={{ value: 'none', className: 'iconfont icon-quanxian'}}
          title='获得的授权'
          arrow='right'
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
        />
        <AtListItem
          iconInfo={{ value: 'none', className: 'iconfont icon-31wentifankui'}}
          title='反馈bug/改进建议'
          arrow='right'
        />
        <AtListItem
          iconInfo={{ value: 'none', className: 'iconfont icon-qianshuxieyi'}}
          title='服务条款与隐私协议'
          arrow='right'
          hasBorder={false}
        />
      </AtList>
    </Card>
  </PageContainer>
}