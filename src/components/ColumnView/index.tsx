import { ScrollView, View } from "@tarojs/components"
import classNames from "classnames"

import styles from './index.module.scss'

const ColumnView = <T extends {}, V extends string | number>(props: {
  tabs?: T[];
  value?: V;
  rowKey: keyof T;
  nameKey: keyof T;
  onChange?: (val?: V, row?: T) => void;
  children?: React.ReactNode
}) => {

  const { tabs, rowKey, nameKey, onChange, value, children } = props
  return <View className='at-row at-row--wrap'>
    <ScrollView className={classNames('at-col at-col-4', styles.gridHeight)} scrollY>
      {
        tabs?.map((ele) => {
          // const { modelId, modelName } = ele
          const name = ele[nameKey]
          const id = ele[rowKey] as unknown as V
          return <View
            key={id}
            className={classNames(styles.modelItem, value === id ? styles.modelItemSelected : '')}
            onClick={() => onChange?.(id, ele)}
          >
            {name}
          </View>
        })
      }
    </ScrollView>
    <ScrollView className={classNames('at-col at-col-8', styles.gridHeight, styles.gridHeightCol)} scrollY>
      {children}
    </ScrollView>
  </View>
}

export default ColumnView;

