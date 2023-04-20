import { View, Text } from "@tarojs/components"
import classNames from "classnames"
import { CSSProperties } from 'react'

const iconStyle: CSSProperties = {
  fontSize: '24px'
}

const ListItem: React.FC<{
  arrowIcon?: string;
  icon?: string;
} & GetIProps<typeof View>> = (props) => {
  const { className, children, arrowIcon= 'item-extra__icon-arrow', icon, ...resetProps } = props
  return <View className={classNames('at-list__item', className)} {...resetProps}>
  <View className='at-list__item-container'>
    <View className='at-list__item-icon item-icon'>
      <Text className={classNames('at-icon at-icon-none', icon)} style={iconStyle} />
    </View>
    <View className='at-list__item-content item-content'>
      <View className='item-content__info'>
        <View className='item-content__info-title'>
          {children}
        </View>
      </View>
    </View>
    <View className='at-list__item-extra item-extra'>
      <View className='item-extra__icon'>
        <Text className={classNames('at-icon at-icon-chevron-right', arrowIcon)} />
      </View>
    </View>
  </View>
</View>
}

export default ListItem