import dayjs from "dayjs"
import { useMemo } from 'react'
import { Text } from '@tarojs/components'

type TimeTextType = {
  value?: dayjs.Dayjs | string | number | Date;
  valueFormat?: string;
  /** 显示的格式 */
  showFormat?: string;
  /** 直接转成的格式，不走与现在时间的判断 */
  directFormat?: string;
}

const getTimeText = (options: TimeTextType) => {
  const { value, valueFormat, showFormat = 'YYYY年MM月DD日 HH:mm', directFormat } = options
  if (value === undefined || value === null) {
    return '--'
  }
  const valDayjs = dayjs(value, valueFormat)
  if (directFormat) {
    return valDayjs.format(directFormat)
  }

  const now = +dayjs().unix()
  const sym = (+valDayjs.unix() - now > 0) ? '后' : '前'
  const abs = Math.abs(+valDayjs.unix() - now)
  if (abs.toFixed(0) === '0') {
    return '现在'
  }
  if (abs < 30) {
    return '刚刚'
  }
  if (abs < 60) {
    return `${abs}秒${sym}`
  }
  if (abs < 60 * 60) {
    return `${(abs / 60).toFixed(0)}分钟${sym}`
  }
  if (abs < 60 * 60 * 24) {
    return `${(abs / 60 / 60).toFixed(0)}小时${sym}`
  }
  if (abs < 60 * 60 * 24 * 2) {
    return '昨天'
  }
  if (abs < 60 * 60 * 24 * 7) {
    return `${(abs / 60 / 60 / 24).toFixed(0)}天${sym}`
  }

  return valDayjs.format(showFormat)
}

const TimeShow: React.FC<TimeTextType & GetIProps<typeof Text>> & {
  getTimeText: typeof getTimeText;
} = (props) => {
  const { value, valueFormat, showFormat, directFormat, ...resetProps } = props
  
  const res = useMemo(() => {
    return getTimeText({ value, valueFormat, showFormat, directFormat })
  }, [directFormat, showFormat, value, valueFormat])

  return <Text {...resetProps}>{res}</Text>
}

TimeShow.getTimeText = getTimeText

export default TimeShow;