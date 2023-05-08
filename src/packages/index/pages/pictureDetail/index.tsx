import { ButtonAsync, Card, ConversationInfo, ImageItem, ListItem, Logo, PageContainer } from "@/components"
import { useData, useMemoizedFn, useRouterParams } from "@/hooks";
import { buyPictureAction, getDrawingDetail } from "@/serves";
import { actions } from "@/store";
import { showToast } from "@/utils";
import { getCheckStatusText } from "@/utils/enum";
import { View, Text } from "@tarojs/components";
import { previewImage } from "@tarojs/taro";
import classNames from "classnames";
import { useRequest } from "taro-hooks";
import { AtList } from "taro-ui";

import styles from './index.module.scss'

const PictureDetail: React.FC = () => {
  const { pictureId } = useRouterParams('pictureDetail')
  const { data, run: refresh } = useRequest(getDrawingDetail, {defaultParams: [pictureId]})
  const { checkStatus, createTime, prompt, negativePrompt, tags, url, artists, styles: stylesArt, width, height, ratio, modelName, ownerCount, isOwner } = data || {}
  const pictureInfo = data

  const { buyAiDrawingPicture } = useData(({common}) => common.avoSettings) || {}

  const getAuth = useMemoizedFn(async () => {
    await actions.modalOption({
      content: <>获取授权后可查看无水印高清原图，并可用于商用。是否花费
      {buyAiDrawingPicture}个<Logo />获取授权？</>,
      title: '获取授权'
    })
    await buyPictureAction(pictureId)
    await refresh(pictureId)
    showToast('获取成功')
  })

  const opNode = <>
    <Text className='margin-right-xs text-blue'>
      查看原图
    </Text>、
    <Text className='text-blue'>
      商业用途
    </Text>
  </>

  return <PageContainer
    title='图片详情'
    notice={isOwner ? <>已获取该图片授权，可进行 {opNode}</> : <>图片版权属于牛油果AI，{opNode}需获取授权</>}
  >
    <ConversationInfo
      {...data}
      checkStatus={undefined}
      categoryName={getCheckStatusText(checkStatus)}
      updateTime={createTime}
    >
      {prompt && <View>
        <Text className='text-gray'>提示词：</Text>
        <Text>{prompt}</Text>
      </View>}
      {negativePrompt && <View>
        <Text className='text-gray'> 消极提示词：</Text>
        <Text>{negativePrompt}</Text>
      </View>}
    </ConversationInfo>
    {url &&<View className='padding width-100'>
      <ImageItem
        src={url}
        hideDetailTip
        imgClassName='width-100'
        onClick={() => previewImage({urls: [url],current: url})}
      />
    </View>}
    <Card title='其他信息' className='margin-bottom'>
      <AtList className={styles.list} hasBorder={false}>
        <ListItem note={modelName}>
          模型
        </ListItem>
        <ListItem note={`${width} X ${height} (${ratio})`}>
          尺寸
        </ListItem>
        <ListItem note={pictureInfo?.property}>
          属性
        </ListItem>
        <ListItem note={pictureInfo?.fileSizeStr}>
          大小
        </ListItem>
        <ListItem note={pictureInfo?.steps}>
          步数
        </ListItem>
        <ListItem note={<ConversationInfo.Tags tags={artists} />}>
          艺术家
        </ListItem>
        <ListItem note={<ConversationInfo.Tags tags={stylesArt} />}>
          风格
        </ListItem>
        <ListItem note={<ConversationInfo.Tags tags={tags} />}>
          提示词
        </ListItem>
        <ListItem note={<ConversationInfo.Tags tags={negativePrompt} />}>
          消极提示词
        </ListItem>
        <ListItem note={pictureInfo?.seed}>
          种子
        </ListItem>
        <ListItem note={pictureInfo?.restoreFaces ? '细致化脸部' : '默认'}>
          脸部操作
        </ListItem>
        <ListItem note={pictureInfo?.samplingMethod}>
          采样方法
        </ListItem>
        <ListItem note={pictureInfo?.cFG} hasBorder={false}>
          CFG
        </ListItem>
      </AtList>
    </Card>
    <View className={classNames('bg-white flex', styles.bottomTip)}>
      已授权 <Text className='text-blue'>{ownerCount}</Text> 用户
      <ButtonAsync type='primary' size='mini' className={styles.button} disabled={isOwner} onClick={getAuth}>
        {!isOwner ? <>获得授权 {buyAiDrawingPicture} <Logo /></> : '已有授权'}
      </ButtonAsync>
    </View>
  </PageContainer>
}

export default PictureDetail;
