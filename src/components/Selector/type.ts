export type OptionsType<V extends VType> = {
  label?: React.ReactNode,
  value?: V;
  children?: OptionsType<V>[];
  disabled?: boolean;
};

export type MType = 'multi' | 'select'
export type VType = string | number

export type ValueType<M extends MType, V extends VType> = M extends 'multi' ? V[] : V;
