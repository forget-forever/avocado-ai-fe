import { useMemo, useState } from "react"
import { MType, OptionsType, ValueType, VType } from "./type"

export const useSelect = <V extends VType, M extends MType>(options?: OptionsType<V>[], value?: ValueType<M, V>, defalutValue?: V) => {
  const [curSelectTab, setCurSelectTab] = useState<V>()

  const selectName = useMemo(() => {
    if (curSelectTab !== undefined) {
      return curSelectTab
    }
    return options?.find((ele) => {
      return ele.children?.some(({value: val}) => {
        if (Array.isArray(value)) {
          return value.includes(val!)
        }
        return value === val
      })
    })?.value || defalutValue
  }, [curSelectTab, defalutValue, options, value])
  return { curSelectTab, setCurSelectTab, selectName}
}