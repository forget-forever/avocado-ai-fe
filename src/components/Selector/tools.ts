import { MType, ValueType, VType } from "./type";

export const isIncluedes = <V extends VType, M extends MType>(val?: ValueType<M, V>, curVal?: V) => {
  if (typeof val === 'string' || typeof val === 'number') {
    return val === curVal
  }
  if (Array.isArray(val)) {
    return val.includes(curVal!)
  }
  return false
}