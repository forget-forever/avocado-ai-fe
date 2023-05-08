import { View, Text } from "@tarojs/components"
import classNames from "classnames"
import { CSSProperties } from 'react'
import { AtBadge } from "taro-ui"

const iconStyle: CSSProperties = {
  fontSize: '24px'
}
const noLeft: CSSProperties = {
  marginRight: 0,
}

const ListItem: React.FC<{
  arrowIcon?: string;
  icon?: string;
  /** 取代icon的节点 */
  iconNode?: React.ReactNode;
  note?: React.ReactNode;
  /** 
   * 有没有border
   * @default true
   */
  hasBorder?: boolean;
  /**
   * 副标题
   */
  describe?: React.ReactNode;
  /** 红点 */
  dot?: boolean;
  /** 红点值 */
  dotValue?: string | number;
  /** 最大的红点值 */
  maxValue?: number
} & GetIProps<typeof View>> = (props) => {
  const {
    className,
    dot,
    children,
    arrowIcon= 'at-icon-chevron-right item-extra__icon-arrow',
    icon,
    iconNode,
    note,
    hasBorder = true,
    describe,
    dotValue,
    maxValue,
    ...resetProps
  } = props
  return <View className={classNames('at-list__item', className, !hasBorder ? 'at-list__item--no-border' : '')} {...resetProps}>
  <View className='at-list__item-container'>
    {(icon || iconNode) && <AtBadge dot={dot} value={dotValue} maxValue={maxValue}>
      <View className='at-list__item-icon item-icon'>
        <Text className={classNames('at-icon at-icon-none', icon)} style={iconStyle}>
          {iconNode}
        </Text>
      </View>
    </AtBadge>}
    <View className='at-list__item-content item-content' style={arrowIcon ? undefined : noLeft}>
      <View className='item-content__info'>
        <View className='item-content__info-title'>
          {children}
        </View>
        {describe && <View className='item-content__info-note'>{describe}</View>}
      </View>
    </View>
    <View className='at-list__item-extra item-extra'>
      <View className='item-extra__icon'>
        {note || <Text className={classNames('at-icon', arrowIcon)} />}
      </View>
    </View>
  </View>
</View>
}

export default ListItem