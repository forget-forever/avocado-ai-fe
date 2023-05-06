import { Image, View, Text } from '@tarojs/components'

import Tip from './Tip'

const Empty: {
  Tip: typeof Tip
} & React.FC = (props) => {
  const {children} = props
  return <View className='text-gray text-center'>
    <Image src='https://avocado-ai.oss-cn-shenzhen.aliyuncs.com/Images/empty.png' className='block center' mode='aspectFill' />
    <Text>
      {children || '没有更多内容'}
    </Text>
  </View>
}

Empty.Tip = Tip;

export default Empty;