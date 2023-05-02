import { AtFloatLayout } from "taro-ui"
import { Text } from '@tarojs/components'
import { ColumnView, Selector } from "@/components"
import { useBoolean } from "@/hooks"
import { useMemo } from "react"
import { useRequest } from "taro-hooks"
import { getTags } from "@/serves"

const { TagList, useSelect } = Selector

const TagSelect: React.FC<{
  options?: string[],
  value?: string[],
  onChange?: (val?: string[]) => void
} & GetIProps<typeof Text>> = (props) => {
  const { children, options, value, onChange, ...resetProps } = props
  const [ floatOpen, { setFalse: closeFloat, setTrue: openFloat } ] = useBoolean()
  const tabs = useMemo(() => options?.map((ele) => ({value: ele, label: ele})), [options])

  const { selectName, setCurSelectTab } = useSelect(tabs, value, options?.[0])

  const {data: tags, loading} = useRequest(async () => {
    if (!selectName) return []
    const res = await getTags(selectName)
    return res.map((ele) => ({value: ele, label: ele}))
  }, {refreshDeps: [selectName]})

  return <>
    <Text onClick={openFloat} {...resetProps}>{children}</Text>
    <AtFloatLayout isOpened={floatOpen} onClose={closeFloat} title='词库'>
      <ColumnView tabs={tabs} rowKey='value' nameKey='label' onChange={setCurSelectTab} value={selectName}>
        <TagList options={tags} mode='multi' value={value} onChange={onChange} loading={loading} />
      </ColumnView>
    </AtFloatLayout>
  </>
}

export default TagSelect;