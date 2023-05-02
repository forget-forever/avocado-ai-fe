import { ColumnView, Empty, ListTitle, TitleDesc } from "@/components"
import { useBoolean } from "@/hooks"
import { getModelExamples } from "@/serves"
import { View, Image } from "@tarojs/components"
import classNames from "classnames"
import { useRequest } from "taro-hooks"
import { AtFloatLayout, AtListItem } from "taro-ui"
import { useMemo } from 'react'
import { keyBy } from "lodash"
import styles from './index.module.scss'

const ModelSelect: React.FC<{
  value?: string;
  onChange?: (val?: string) => void;
  models?: API.DrawingModelInfoVM[]
}> = (props) => {
  const { models = [], value, onChange } = props
  const [ floatOpen, { setFalse: closeFloat, setTrue: openFloat } ] = useBoolean()

  const { data: sampleList } = useRequest(async () => {
    if (!value) {
      return [];
    }
    const res = await getModelExamples({
      modelId: value,
      page: 1,
      limit: 200
    })
    return res
  }, {refreshDeps: [value]})

  const modelMap = useMemo(() => keyBy(models, (s) => s.modelId), [models])
  const modelSelect = modelMap[value!]

  return <>
    <ListTitle>AI模型</ListTitle>
    <AtListItem title={modelSelect?.modelName || '请选择AI模型'} note={`该模型已被使用${modelSelect?.usedCount}次, ${modelSelect?.description}`} onClick={openFloat} arrow='right' />
    <AtFloatLayout isOpened={floatOpen} title='模型库' onClose={closeFloat} scrollY={false}>
      <ColumnView tabs={models} rowKey='modelId' nameKey='modelName' value={value} onChange={onChange}>
        {sampleList?.map((ele) => {
          const { url, name, header, pictureId } = ele
          return <View key={pictureId} >
            <TitleDesc className={styles.sampleItem}>
              <Image src={header} className={classNames('circle', styles.sampleItemAvatar)} lazyLoad />
              {name}
            </TitleDesc>
            <Image src={url} className='black' />
          </View>
        })}
        {!sampleList?.length && <Empty />}
      </ColumnView>
    </AtFloatLayout>
  </>
}

export default ModelSelect;