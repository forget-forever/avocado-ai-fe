import { View } from "@tarojs/components"
import { useMemoizedFn } from "@/hooks"
import classNames from "classnames"
import { AtLoadMore } from "taro-ui"

import { MType, OptionsType, ValueType, VType } from "./type"
import styles from './index.module.scss'
import { isIncluedes } from "./tools"



const TagList = <V extends VType, M extends MType = 'select'>(props: {
  options?: OptionsType<V>[];
  mode?: M
  value?: ValueType<M, V>
  onChange?: (val?: ValueType<M, V>) => void;
  disabled?: boolean;
  loading?: boolean;
}) => {
  const { value, onChange, disabled, options, mode = 'select', loading } = props

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
        className={classNames(styles.tagItem, isIncluedes(value, eleVal) ? styles.tagItemSelected : '', disabledRes ? styles.tagItemDisabled : '')}
      >
        {label}
      </View>
    })}
    {loading && <AtLoadMore status='loading' />}
  </>
}

export default TagList;