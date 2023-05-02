import { PageContainer, Selector, TipInput } from "@/components"
import { AtList, AtNoticebar } from "taro-ui";
import { useMemo } from "react";
import useForm from "rc-form-hooks";
import { useRequest } from "taro-hooks";
import { getDrawingParamsVM } from "@/serves";
import { Text, View } from '@tarojs/components'

import ModelSelect from "./ModelSelect";
import TagSelect from "./TagSelect";



const Draw: React.FC = () => {
  const { getFieldDecorator, setFieldsValue, values } = useForm<API.CreateDrawingVM>()

  const { data: drawParams } = useRequest(async () => {
    const res  = await getDrawingParamsVM()
    setFieldsValue({
      modelId: res.models[0].modelId
    })
    return res
  })
  const { models, tagCategories, negativeTagCategories } = drawParams || {}

  const negativeTagsCnf = useMemo(() => {
    return negativeTagCategories?.map((ele) => ({value: ele, label: ele}))
  },[negativeTagCategories])

  const {tags = [], negativeTags = []} = values || {}

  const WordsNode = <>
    词库<Text className='iconfont icon-search text-xl'></Text>
  </>

  return <PageContainer title='AI绘图'>
    <AtNoticebar icon='volume-plus' marquee>
      这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
    </AtNoticebar>
    <AtList>
      {getFieldDecorator('modelId')(<ModelSelect models={models} />)}
      {getFieldDecorator('prompt')(<TipInput
        label={<>
          提示词
          {getFieldDecorator('tags')(<TagSelect options={tagCategories} className='text-blue float-right'>
              {WordsNode}
            </TagSelect>
          )}
        </>}
        describeExtra={<View className='text-sm'>{tags.toString()}</View>}
      />)}
      {getFieldDecorator('negativePrompt')(<TipInput
        label={<>
          消极提示词
          {getFieldDecorator('negativeTags')(<Selector options={negativeTagsCnf} mode='multi'>
            <Text className='text-blue float-right'>{WordsNode}</Text>
          </Selector>)}
        </>}
        describeExtra={<View className='text-sm'>{negativeTags.toString()}</View>}
      />)}
    </AtList>
  </PageContainer>
}

export default Draw;