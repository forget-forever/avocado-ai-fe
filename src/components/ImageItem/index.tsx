import { useMemoizedFn } from "@/hooks";
import { Image, ITouchEvent, View } from "@tarojs/components"
import classNames from "classnames"
import { AtIcon } from "taro-ui";

import styles from './index.module.scss'

const ImageItem: React.FC<{
  src: string;
  mode?: GetIProps<typeof Image>['mode'];
  imgClassName?: string;
  onDetailClick?: () => void;
  detailTitle?: React.ReactNode;
  /** 隐藏下面的详情提示 */
  hideDetailTip?: boolean;
} & GetIProps<typeof View>> = (props) => {
  const { src, className, mode, imgClassName, children, onDetailClick, detailTitle, hideDetailTip, ...resetProps } = props;

  const detialClick = useMemoizedFn((e: ITouchEvent<any>) => {
    e.stopPropagation()
    onDetailClick?.()
  })

  return <View className={classNames('relative width-100 text-center', className)} {...resetProps}>
    <Image src={src} mode={mode} className={imgClassName} />
    {!hideDetailTip && <View className={classNames('absolute width-100', styles.tipMask)}>
      {children}
      <View onClick={detialClick}>
        {detailTitle || <>查看无水印原图<AtIcon value='chevron-right' /></>}
      </View>
    </View>}
  </View>
}

export default ImageItem;
