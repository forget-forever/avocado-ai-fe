import { keyBy } from "lodash"
import { useMemo, useState } from "react"
import { MType, OptionsType, ValueType, VType } from "./type"

export const useSelect = <V extends VType, M extends MType>(options?: OptionsType<V>[], value?: ValueType<M, V>, defalutValue?: V) => {
  const [curSelectTab, setCurSelectTab] = useState<V>()

  const optionsMap = useMemo(() => {
    return keyBy(options, 'value')
  }, [options])

  const { selectName, selected } = useMemo(() => {
    if (curSelectTab !== undefined) {
      return {selectName: curSelectTab, selected: optionsMap[curSelectTab]}
    }
    const selectedRow = options?.find((ele) => {
      return ele.children?.some(({value: val}) => {
        if (Array.isArray(value)) {
          return value.includes(val!)
        }
        return value === val
      })
    }) || {}

    return {selectName: selectedRow?.value || defalutValue, selected: selectedRow }
  }, [curSelectTab, defalutValue, options, optionsMap, value])

  return { curSelectTab, setCurSelectTab, selectName, selected}
}