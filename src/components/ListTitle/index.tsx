import { View } from "@tarojs/components"
import classNames from "classnames"
import styles from './index.module.scss'

const ListTitle: React.FC<GetIProps<typeof View>> = (props) => {
  const { children, className, ...resetProps } = props

  return <View className={classNames(className, styles.title)} {...resetProps}>{children}</View>
}

export default ListTitle;
