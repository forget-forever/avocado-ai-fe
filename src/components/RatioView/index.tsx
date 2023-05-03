import { View } from "@tarojs/components"
import { useMemo, CSSProperties } from "react";

const RatioView: React.FC<{
  /** 宽高比例 */
  ratio?: string;
  /** 基准宽度 */
  base?: number;
}> = (props) => {
  const { ratio, base = 10, children } = props;

  const styleCnf = useMemo<CSSProperties>(() => {
    const [width, height] = ratio?.split(/[^\d]/) || [];
    return {
      width: `${base}px`,
      height: `${(+height || 0) / (+width || 0) * base}px`,
    }
  }, [base, ratio])
  return <View style={styleCnf} className='flex flex-center'>
    {children}
  </View>
}

export default RatioView;
