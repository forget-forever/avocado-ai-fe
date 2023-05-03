import { Card, ListItem, ListTitle, Logo, PageContainer, RatioView, Selector, TipInput } from "@/components"
import { AtInputNumber, AtList, AtNoticebar, AtSlider } from "taro-ui";
import { useMemo } from "react";
import useForm from "rc-form-hooks";
import { useRequest } from "taro-hooks";
import { getDrawingParamsVM } from "@/serves";
import { Input, Text, View } from '@tarojs/components'
import { keyBy } from "lodash";
import { invalidFunc } from "@/utils";

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
  const { models, tagCategories, negativeTagCategories, properties } = drawParams || {}

  const { negativeTagsCnf, propertiesCnf, propertiesMap } = useMemo(() => {
    const proTemp = properties?.map((ele) => ({
      ratioMap: keyBy(ele.ratioList, 'id'),
      ...ele
    }))
    return {
      negativeTagsCnf: negativeTagCategories?.map((ele) => ({value: ele, label: ele})),
      propertiesCnf: properties?.map(({ id, label, ratioList }) => ({
        value: id,
        label,
        children: ratioList.map(({id, label}) => ({
          value: id,
          label: <RatioView base={20} ratio={label}>{label}</RatioView>
        }))
      })),
      propertiesMap: keyBy(proTemp, 'id'),
    }
  },[negativeTagCategories, properties])

  const {tags = [], negativeTags = [], ratio} = values || {}
  const { selectName: proper } = Selector.useSelect(propertiesCnf, ratio)
  const sleectProperties = propertiesMap[proper!] || {}

  let qualityTitle = '请选择'
  if (proper && sleectProperties && ratio) {
    qualityTitle = `画质：${sleectProperties?.label}; 比例：${sleectProperties.ratioMap?.[ratio!]?.label}`
  }

  const WordsNode = <>
    词库<Text className='iconfont icon-search text-xl'></Text>
  </>

  return <PageContainer title='AI绘图'>
    <AtNoticebar icon='volume-plus' marquee>
      这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
    </AtNoticebar>
    <Card title='图片信息' className='margin-top' padding='0'>
      <AtList hasBorder={false}>
        {getFieldDecorator('modelId')(<ModelSelect models={models} />)}
        {getFieldDecorator('prompt')(<TipInput
          label={<>
            提示词
            {getFieldDecorator('tags')(<TagSelect options={tagCategories} className='text-blue float-right'>
                {WordsNode}
              </TagSelect>
            )}
          </>}
          describeExtra={<View className='text-xs'>{tags.toString()}</View>}
        />)}
        {getFieldDecorator('negativePrompt')(<TipInput
          label={<>
            消极提示词
            {getFieldDecorator('negativeTags')(<Selector options={negativeTagsCnf} mode='multi'>
              <Text className='text-blue float-right'>{WordsNode}</Text>
            </Selector>)}
          </>}
          describeExtra={<View className='text-xs'>{negativeTags.toString()}</View>}
        />)}
        <ListTitle>图片质量</ListTitle>
        {getFieldDecorator('ratio')(<Selector options={propertiesCnf} cascader>
          <ListItem>{qualityTitle}</ListItem>
        </Selector>)}
        <ListTitle>图片数量</ListTitle>
        <ListItem arrowIcon='' describe='当前参数最多生成24张图片'>
          {getFieldDecorator('imageCount', {initialValue: 1})(<AtInputNumber type='number' value={0} onChange={invalidFunc} />)}
        </ListItem>
        <ListTitle>步长 0.05<Logo />/步</ListTitle>
        <ListItem arrowIcon='' describe={<Text className='text-xs'>一般情况步长越大，图片细节更多，但图片生成越慢。</Text>} hasBorder={false}>
          {getFieldDecorator('steps', {initialValue: 1})(<AtSlider showValue />)}
        </ListItem>
      </AtList>
    </Card>
    <Card title='高级参数' className='margin-top' padding='0'>
      <AtList hasBorder={false}>
        <ListTitle>种子</ListTitle>
        <ListItem arrowIcon=''>
          {getFieldDecorator('artists')(<Input type='number' />)}
        </ListItem>
      </AtList>
    </Card>
  </PageContainer>
}

export default Draw;