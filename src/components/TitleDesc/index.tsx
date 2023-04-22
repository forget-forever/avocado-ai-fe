import { View } from "@tarojs/components"
import classNames from "classnames"

import styles from './index.module.scss'

const TitleDesc: React.FC<GetIProps<typeof View>> = (props) => {
  const { children, className, ...resetProps } = props
  return <View className={classNames(className, styles.container)} {...resetProps} >
    {children}
  </View>
}

export default TitleDesc;