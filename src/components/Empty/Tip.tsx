import { Image, View, Text } from '@tarojs/components'

const Tip: React.FC = (props) => {
  const {children} = props
  return <View className='text-gray text-center'>
    <Image src='https://avocado-ai.oss-cn-shenzhen.aliyuncs.com/Images/noMessage.png' className='block center' mode='aspectFill' />
    <Text>
      {children || '没有更多内容'}
    </Text>
  </View>
}

export default Tip;
