import { CopyIcon, OpenButton, PageContainer } from "@/components"
import { useMemoizedFn, useRouterParams } from "@/hooks";
import { getNoWatermarkContentInfoVM } from "@/serves";
import { actions } from "@/store";
import { Video, View, Text, Button } from "@tarojs/components";
import { previewImage } from "@tarojs/taro";
import classNames from "classnames";
import { useRequest } from "taro-hooks";
import { AtLoadMore } from "taro-ui";
import styles from './index.module.scss'

const tipStyle = {width: '200px', lineHeight: 1}

const MediaDetail: React.FC = () => {
  const { id } = useRouterParams('mediaDetail')

  const { data, loading } = useRequest(async () => {
    const res = await getNoWatermarkContentInfoVM(id)
    return res
  })

  const downloadHandle = useMemoizedFn(async () => {
    await actions.modalOption({
      title: '提示',
      content: <>
        小程序暂时无法直接下载，请复制链接(<View className='line-ellipsis inline-block text-blue' style={tipStyle}>
          {data?.contentUrl}
        </View>)到浏览器中下载
      </>,
      showClose: true,
      positiveText: '复制',
    })
    CopyIcon.copyText(data?.title || "", '已复制链接')
  })

  const seenPic = useMemoizedFn(() => {
    if (!data?.img) {
      return;
    }
    previewImage({
      current: data?.img,
      urls: [data?.img]
    })
  })

  return <PageContainer title='解析结果' useContainer>
    {data?.contentUrl && <Video src={data?.contentUrl} className='width-100' title={data.title} />}
    {data && <View className='width-95 flex'>
      <View className='inline line-ellipsis'>{data?.contentUrl}</View>
      <View className='flex'>
        <Text className={classNames('iconfont icon-xiazai text-xxl', styles.splitRitht)} onClick={downloadHandle} />
        <OpenButton openType='share' nostyle><Text className='iconfont icon-fenxiang text-xxl' onClick={downloadHandle} /></OpenButton>
      </View>
    </View>}
    {data?.img && <Button type='primary' className='width-95 margin-top' onClick={seenPic}>查看封面</Button>}
    {loading && <AtLoadMore status='loading' />}
  </PageContainer>
}
export default MediaDetail;