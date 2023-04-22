import dayjs from "dayjs"
import { useMemo } from 'react'
import { Text } from '@tarojs/components'

type TimeTextType = {
  value?: dayjs.Dayjs | string | number | Date;
  valueFormat?: string;
  showFormat?: string;
}

const getTimeText = (options: TimeTextType) => {
  const { value, valueFormat, showFormat } = options
  const valDayjs = dayjs(value, valueFormat)
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
    return `${(abs / 60).toFixed(0)}分${sym}`
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

const TimeShow: React.FC<TimeTextType> & {
  getTimeText: typeof getTimeText;
} = (props) => {
  const { value, valueFormat, showFormat = 'YYYY年MM月DD日 HH:mm' } = props
  
  const res = useMemo(() => {
    return getTimeText({ value, valueFormat, showFormat })
  }, [showFormat, value, valueFormat])

  return <Text>{res}</Text>
}

TimeShow.getTimeText = getTimeText

export default TimeShow;