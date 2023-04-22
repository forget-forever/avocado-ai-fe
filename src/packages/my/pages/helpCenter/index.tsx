import { Card, Logo, PageContainer } from "@/components"
import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";

const HelpCenter: React.FC = () => {
  return <PageContainer
    title='小提示'
    share={{
      path: 'pages/index/index'
    }}
  >
    <Card renderIcon={<Text className='iconfont icon-tishi text-yellow text-xl' />} title='如何获取牛油果' className='margin-top'>
      <View className='flex align-items'>新用户注册， 获取 10 <Logo /></View>
      <View className='flex align-items'>绑定微信公众号， 获取 10 <Logo /></View>
      <View className='flex align-items'>绑定手机号， 获得10 <Logo /></View>
      <View className='flex align-items'>
        邀请新用户注册， 奖励10 <Logo /><AtButton openType='share' className='link-button'>立即邀请</AtButton>
      </View>
      <View className='flex align-items'>
        每日签到， 奖励3 <Logo />
      </View>
    </Card>
    <Card renderIcon={<Text className='iconfont icon-changjianwentixiangguanwenti text-yellow text-xl' />} title='什么情况下消耗牛油果' className='margin-top'>
      <View className='flex align-items'>向ChatGPT提问， 消耗 1 <Logo /></View>
      <View className='flex align-items'>ChatGPT应用每个对话， 获得1 <Logo /></View>
      <View className='flex align-items'>
        AI绘图，根据图片参数动态计算消耗 <Logo />
      </View>
      <View className='flex align-items'>
        获得AI绘图图片授权，消耗10<Logo />
      </View>
      <View className='flex align-items'>
        AI修复图片，据图片参数动态计算消耗<Logo />
      </View>
      <View className='flex align-items'>
        获取各大平台无水印内容，消耗1<Logo />
      </View>
      <View className='flex align-items'>
        AI智能扣图，去背景，消耗2<Logo />
      </View>
    </Card>
  </PageContainer>
}

export default HelpCenter;