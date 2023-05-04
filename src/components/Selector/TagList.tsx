import { View } from "@tarojs/components"
import { useMemoizedFn } from "@/hooks"
import classNames from "classnames"
import { AtLoadMore } from "taro-ui"

import { MType, OptionsType, ValueType, VType } from "./type"
import styles from './index.module.scss'
import { isIncluedes } from "./tools"



const TagList = <V extends VType, M extends MType = 'select'>(props: {
  /** 选择项 */
  options?: OptionsType<V>[];
  /** 选择模式 */
  mode?: M;
  /** 值 */
  value?: ValueType<M, V>
  /** 改变时候的操作 */
  onChange?: (val?: ValueType<M, V>) => void;
  /** 是否屏蔽 */
  disabled?: boolean;
  /** 是否处于加载状态 */
  loading?: boolean;
  /** 每一项的多余类名 */
  itemClassName?: string;
}) => {
  const { value, onChange, disabled, options, mode = 'select', loading, itemClassName } = props

  const changeHandle = useMemoizedFn((val?: V) => {
    if (val === undefined) return
    if (isIncluedes(value, val)) {
      if (mode === 'select') {
        onChange?.(undefined)
      } else if (Array.isArray(value)) {
        const newVal = [...value]
        newVal.splice(value.indexOf(val), 1)
        onChange?.(newVal as ValueType<M, V>)
      }
    } else {
      if (Array.isArray(value) || (value === undefined && mode === 'multi')) {
        onChange?.((value! || [] as V[]).concat(val) as ValueType<M, V>)
      } else if (mode === 'select') {
        onChange?.(val as typeof value)
      }
    }
  })

  return <>
    {!loading && options?.map((ele) => {
      const { value: eleVal, label, disabled: eleDisabled } = ele
      const disabledRes = (disabled || eleDisabled)
      return <View
        key={eleVal}
        onClick={disabledRes ? undefined : () => changeHandle?.(eleVal)}
        className={classNames(styles.tagItem, itemClassName, isIncluedes(value, eleVal) ? styles.tagItemSelected : '', disabledRes ? styles.tagItemDisabled : '')}
      >
        {label}
      </View>
    })}
    {loading && <AtLoadMore status='loading' />}
  </>
}

export default TagList;