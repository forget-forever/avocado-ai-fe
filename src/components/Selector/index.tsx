import { useBoolean, useMemoizedFn } from "@/hooks"
import { cloneElement } from "react"
import { AtFloatLayout } from "taro-ui"

import ColumnView from "../ColumnView";
import { useSelect } from "./hooks";
import TagList from "./TagList";
import { MType, OptionsType, ValueType, VType } from "./type";


const Selector = <V extends VType, M extends MType = 'select'>(props: {
  children: JSX.Element;
  disabled?: boolean;
  mode?: M
  value?: ValueType<M, V>
  onChange?: (val?: ValueType<M, V>) => void;
  options?: OptionsType<V>[]
  cascader?: boolean;
}) => {
  const { children, disabled, mode, value, onChange, cascader, options } = props
  const [ floatOpen, { setFalse: closeFloat, setTrue: openFloat } ] = useBoolean()

  const clickHandle = useMemoizedFn(() => {
    if (disabled) return
    openFloat()
  })

  const childRes = cloneElement(children, {
    onClick: clickHandle
  })

  const { selectName, setCurSelectTab } = useSelect(options, value)
  
  return <>
    {childRes}
    <AtFloatLayout isOpened={floatOpen} onClose={closeFloat} title='请选择'>
      {
        cascader ? <ColumnView rowKey='value' nameKey='label' tabs={options} value={selectName} onChange={setCurSelectTab} >
          <TagList value={value} onChange={onChange}  disabled={disabled} />
        </ColumnView> : <TagList value={value} onChange={onChange} mode={mode} disabled={disabled} options={options} />
      }
    </AtFloatLayout>
  </>
}

/** @ts-ignore */
const SelectorRes: (typeof Selector) & {
  TagList: typeof TagList;
  useSelect: typeof useSelect
} = Selector
SelectorRes.TagList = TagList;
SelectorRes.useSelect = useSelect;

export default SelectorRes;