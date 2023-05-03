import { Image, View, Text } from '@tarojs/components'

const Empty: React.FC = (props) => {
  const {children} = props
  return <View className='text-gray text-center'>
    <Image src='https://avocado-ai.oss-cn-shenzhen.aliyuncs.com/Images/empty.png' className='width-100' />
    <Text>
      {children || '没有更多内容'}
    </Text>
  </View>
}

export default Empty;