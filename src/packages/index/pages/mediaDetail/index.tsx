import { PageContainer } from "@/components"
import { useRouterParams } from "@/hooks";
import { getNoWatermarkContentInfoVM } from "@/serves";
import { Video, View } from "@tarojs/components";
import { useRequest } from "taro-hooks";

const MediaDetail: React.FC = () => {
  const { id } = useRouterParams('mediaDetail')

  const { data } = useRequest(async () => {
    const res = await getNoWatermarkContentInfoVM(id)
    return res
  })

  return <PageContainer title='解析结果' useContainer>
    {data?.contentUrl && <Video src={data?.contentUrl} className='width-100' />}
    <View className='line-ellipsis width-9'>
      {data?.contentUrl}
    </View>
  </PageContainer>
}
export default MediaDetail;