declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd'
  }
}

declare interface ObjectConstructor {
  entries<T>(o: T): [keyof T, T[keyof T]][];
  keys<T extends object>(o: T): (keyof T)[];
}

/**
 * 获取类型中的值的联合类型
 */
declare type ValueOf<T> = T extends { [K in keyof T]: infer V } ? V : never;

/**
 * 获取一个函数中除第一个参数外的其他参数
 */
declare type OtherParameters<T extends (...args: any) => any> = T extends (f: any, ...args: infer P) => any ? P : never;

/**
 * 自定义的Omit，排除一个类型中的某个属性
 */
declare type MyOmit<T, K extends keyof T> = Omit<T, K>;

/**
 * 获取函数组件的props类型
 */
declare type GetIProps<T> = T extends React.FC<infer P> ? P : never;

 /**
  * 获取class组件的props类型
  */
declare type GetClassIprops<T extends abstract new (...args: any) => any> = ConstructorParameters<T>[0];

/**
 * options选型的类型
 */
declare type IOptions<V = string | number, L = string> = {
  value: V;
  label: L;
}

