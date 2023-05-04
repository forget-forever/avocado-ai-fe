import { ButtonAsync, Card, ListItem, ListTitle, Logo, PageContainer, RatioView, Selector, TipInput } from "@/components"
import { AtInputNumber, AtList, AtSlider } from "taro-ui";
import { useMemo } from "react";
import useForm from "rc-form-hooks";
import { useRequest } from "taro-hooks";
import { createDrawing, getDrawingParamsVM } from "@/serves";
import { Input, Slider, Text, View } from '@tarojs/components'
import { keyBy, random } from "lodash";
import { invalidFunc, showToast,  } from "@/utils";
import { RestroreFacesOptions } from "@/utils/enum";
import { useMemoizedFn } from "@/hooks";
import { navigate } from "@/router";
import { to } from "await-to-js";
import { actions } from "@/store";

import ModelSelect from "./ModelSelect";
import TagSelect from "./TagSelect";

const WordsNode = <>
  词库<Text className='iconfont icon-search text-xl' />
</>


const Draw: React.FC = () => {
  const { getFieldDecorator, setFieldsValue, values, validateFields } = useForm<API.CreateDrawingVM>()

  const { data: drawParams } = useRequest(async () => {
    const res  = await getDrawingParamsVM()
    setFieldsValue({
      modelId: res.models[0].modelId
    })
    return res
  })
  const { models, tagCategories, negativeTagCategories, properties, samplingMethods = [] } = drawParams || {}

  const { propertiesCnf, propertiesMap, samplingMethodsOptions } = useMemo(() => {
    const proTemp = properties?.map((ele) => ({
      ratioMap: keyBy(ele.ratioList, ele => ele.ratioId),
      ...ele
    }))
    return {
      samplingMethodsOptions: samplingMethods.map((ele) => ({label: ele, value: ele})),
      propertiesCnf: properties?.map(({ label, ratioList, propertyId }) => ({
        value: propertyId,
        label,
        children: ratioList.map(({ratioId, label}) => ({
          value: ratioId,
          label: <RatioView base={20} ratio={label}>{label}</RatioView>
        }))
      })),
      propertiesMap: keyBy(proTemp, ele => ele.propertyId),
    }
  }, [properties, samplingMethods])

  const {tags = [], negativeTags = [], ratioId, samplingMethod: samplingMethodVal, steps, imageCount} = values || {}
  const { selectName: properQuality } = Selector.useSelect(propertiesCnf, ratioId)
  const sleectProperties = useMemo(() => propertiesMap[properQuality!] || {}, [properQuality, propertiesMap])
  

  let qualityTitle = '请选择'
  if (properQuality && sleectProperties && ratioId) {
    qualityTitle = `画质：${sleectProperties?.label}; 比例：${sleectProperties?.ratioMap?.[ratioId!]?.label}`
  }

  const totalCost = useMemo(() => {
    if (sleectProperties.stepCost && steps) {
      let v = parseFloat(
        (+sleectProperties.stepCost * +steps * +imageCount).toFixed(2)
      )
      return v
    }
    return 0
  }, [imageCount, sleectProperties, steps])

  const submit = useMemoizedFn(async () => {
    const [err, val] = await to(validateFields())
    if (err || !val) {
      actions.showErrorToast(err)
      return;
    }
    await actions.modalOption({
      title: '开始绘图',
      content: <Text>
        本次消耗{totalCost}<Logo />, 确定开始绘图？
      </Text>,
    })
    const res = await createDrawing({
      ...val,
      propertyId: properQuality!,
    })
    showToast('创建成功')
    navigate('picture', { params: {drawCode: res,}, type: 'redirect' })
  })

  return <PageContainer title='AI绘图' notice='这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏'>
    <Card title='图片信息' className='margin-top'>
      <AtList hasBorder={false}>
        {getFieldDecorator('modelId')(<ModelSelect models={models} />)}
        {getFieldDecorator('prompt', {
          rules: [{ required: !tags?.length, message: '请输入提示词或者从词库选择提示词标签' }]
        })(<TipInput
          label={<>
            提示词
            {getFieldDecorator('tags')(
              <TagSelect options={tagCategories} className='text-blue float-right'>{WordsNode}</TagSelect>
            )}
          </>}
          describeExtra={<View className='text-xs'>{tags.toString()}</View>}
        />)}
        {getFieldDecorator('negativePrompt')(<TipInput
          placeholder='例如：丑陋的女孩/ugly girl'
          label={<>
            消极提示词
            {getFieldDecorator('negativeTags')(<TagSelect options={negativeTagCategories} className='text-blue float-right'>
              {WordsNode}
            </TagSelect>)}
          </>}
          describeExtra={<View className='text-xs'>{negativeTags.toString()}</View>}
        />)}
        <ListTitle>图片质量</ListTitle>
        {getFieldDecorator('ratioId', {
          rules: [{required: true, message: '请选择图片质量'}]
        })(<Selector options={propertiesCnf} cascader>
          <ListItem>{qualityTitle}</ListItem>
        </Selector>)}
        <ListTitle>图片数量</ListTitle>
        <ListItem arrowIcon='' describe='当前参数最多生成24张图片'>
          {getFieldDecorator('imageCount', {initialValue: 1})(<AtInputNumber type='number' value={0} onChange={invalidFunc} />)}
        </ListItem>
        <ListTitle>步长 0.05<Logo />/步</ListTitle>
        <ListItem arrowIcon='' describe={<Text className='text-sm'>一般情况步长越大，图片细节更多，但图片生成越慢。</Text>} hasBorder={false}>
          {getFieldDecorator('steps', {initialValue: 10})(<AtSlider showValue min={10}  />)}
        </ListItem>
      </AtList>
    </Card>
    <Card title='高级参数' className='margin-top'>
      <AtList hasBorder={false}>
        <ListTitle>种子</ListTitle>
        <ListItem arrowIcon='' describe='-1表示每次随机生成一个种子，相同的种子在描述相同时，生成的图片基本一致'>
          <View className='flex'>
            {getFieldDecorator('seed', { initialValue: random(3000, 5000000) })(<Input type='number' className='flex flex-fill' />)}
            <ButtonAsync type='default' size='mini' onClick={() => setFieldsValue({seed: random(3000, 5000000)})}>随机</ButtonAsync>
          </View>
        </ListItem>
        <ListTitle>脸部操作</ListTitle>
        <ListItem arrowIcon=''>
          {getFieldDecorator('restoreFaces')(<Selector.TagList options={RestroreFacesOptions} />)}
        </ListItem>
        <ListTitle>采样算法</ListTitle>
        {getFieldDecorator('samplingMethod', { initialValue: samplingMethodsOptions[0]?.value })(<Selector options={samplingMethodsOptions} onChange={invalidFunc}>
          <ListItem describe='可能特定方法效果更好，一般情况使用默认'>{samplingMethodVal}</ListItem>
        </Selector>)}
        <ListTitle>CFG</ListTitle>
        <ListItem hasBorder={false} describe={<Text className='text-sm'>相似度，越大生成的图片和模型训练数据越相似</Text>}>
          {getFieldDecorator('cFG', {initialValue: 7})(<Slider showValue max={20} />)}
        </ListItem>
      </AtList>
    </Card>
    <ButtonAsync type='primary' className='width-8 margin-top margin-bottom' onClick={submit}>
      开始绘图，需消耗{totalCost}<Logo />
    </ButtonAsync>
  </PageContainer>
}

export default Draw;