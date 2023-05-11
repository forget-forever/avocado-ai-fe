import { ButtonAsync, Card, Logo, PageContainer } from "@/components"
import { useData, useMemoizedFn } from "@/hooks"
import { invalidFunc } from "@/utils"
import { View, Text } from "@tarojs/components"
import useForm from 'rc-form-hooks'
import { AtTextarea } from "taro-ui"
import { getContentWithoutWatermark as getContent } from "@/serves"
import { to } from "await-to-js"
import { actions } from "@/store"

const DownloadMedia: React.FC = () => {
  const { getFieldDecorator, validateFields } = useForm<API.GetContentWithoutWatermarkVM>()
  const { getContentWithoutWatermark } = useData((s) => s.common.avoSettings) || {}

  const submit = useMemoizedFn(async () => {
    const [ err, val ] = await to(validateFields())
    if (err || !val) {
      actions.showErrorToast(err)
      return
    }
    const res = await getContent({ ...val })
    /** 跳转页面 */
  })

  return <PageContainer title='无水印下载'>
    <Card title='分享文案/链接' className='margin-top width-9'>
      { getFieldDecorator('content', { rules: [{required: true, message: '输入分享文案'}] })(
        <AtTextarea value='' onChange={invalidFunc} placeholder='平台视频分享文案（包括分享链接）' maxLength={200} />
      ) }
    </Card>
    <View className='margin-top width-8'>
      <Text>抖音 快手 小红书 微博 微视 皮皮虾 陌陌 唱吧 西瓜视频 今日头条 好看视频 全民小视频 看点视频 趣头条 全民K歌 酷狗音乐 酷我音乐 看看视频 梨视频 哔哩哔哩 网易云音乐 看点视频 QQ看点 小咖秀 看点快报 糖豆 配音秀 大众点评 懂车帝 火山 皮皮搞笑 最左 小影 火山小视频 轻视频 百度视频 新片场 迅雷 美图秀秀 秒拍 美拍 刷宝 剪影 京东 淘宝 天猫 微信公众号 虎牙视频 uc浏览器 QQ浏览器 oppo浏览器 油果浏览器 万能钥匙WiFi 知乎 腾讯新闻 人民日报 开眼 微叭 微云 快看点 彩视 TikTok youtube twitter VUE vigo ACfun yy now 等等200多个短视频平台。如果遇到提取失败请</Text>
    </View>
    <ButtonAsync onClick={submit} type='primary'>提交无水印内容，需消耗{getContentWithoutWatermark}<Logo /></ButtonAsync>
  </PageContainer>
}
export default DownloadMedia;
