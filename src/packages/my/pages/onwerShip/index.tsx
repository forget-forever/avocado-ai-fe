import { PageContainer, TimeShow } from "@/components"
import { useListData } from '@/hooks'
import { navigate } from "@/router"
import { getOwnershipList } from "@/serves"
import { ConversationType } from "@/utils/enum"
import { View } from "@tarojs/components"
import { AtAvatar, AtTag } from "taro-ui"

const OnwerShip: React.FC = () => {
  const { listData, } = useListData(getOwnershipList, { conversationType: ConversationType.AiDrawing })

  return <PageContainer title='授权记录'>
    {listData.map((ele) => {
      const { id, image, title, ownershipTime, sourceCode } = ele
      return <View
        className='width-9 radius padding bg-white margin-top'
        key={id}
        onClick={() => navigate('pictureDetail', { params: {pictureId: sourceCode} })}
      >
        <View className='flex'>
          <AtAvatar image={image} />
          <View className='flex-fill flex margin-left'>{title}</View>
        </View>
        <View className='flex margin-top-xs align-items'>
          <AtTag type='primary' active size='small'>AI绘图</AtTag>
          <View className='text-sm right'>授权于<TimeShow value={ownershipTime} /></View>
        </View>
      </View>
    })}
  </PageContainer>
}

export default OnwerShip;