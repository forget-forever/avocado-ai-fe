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
  /** 是否开启级联 */
  cascader?: boolean;
  /** 
   * 切换tab的时候清除value
   * @default 单选的时候为true
   */
  clearName?: boolean;
  /** 弹出浮层的标题 */
  floatTitle?: string;
}) => {
  const { children, disabled, mode = 'select' as M, value, onChange, cascader, floatTitle = '请选择', options, clearName } = props
  const [ floatOpen, { setFalse: closeFloat, setTrue: openFloat } ] = useBoolean()

  const clickHandle = useMemoizedFn(() => {
    if (disabled) return
    openFloat()
  })

  const childRes = cloneElement(children, {
    onClick: clickHandle
  })

  const { selectName, setCurSelectTab, selected } = useSelect(options, value)

  const changeSelectName = useMemoizedFn((val?: V) => {
    let clearRes = clearName
    if (clearName === undefined && mode === 'select' ) {
      clearRes = true
    }
    if (clearRes) {
      onChange?.(undefined)
    }
    setCurSelectTab(val)
  })
  
  return <>
    {childRes}
    <AtFloatLayout isOpened={floatOpen} onClose={closeFloat} title={floatTitle}>
      {
        cascader ? <ColumnView rowKey='value' nameKey='label' tabs={options} value={selectName} onChange={changeSelectName} >
          <TagList value={value} onChange={onChange} mode={mode} disabled={disabled} options={selected?.children} />
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