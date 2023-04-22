import { PageContainer } from "@/components"
import { RichText } from "@tarojs/components"
import { privacyNode } from "./privacyStr"

const Privacy: React.FC = () => {
  return <PageContainer
    title='服务条款与隐私协议'
    share={{path: 'pages/index/index'}}
  >
    <RichText nodes={privacyNode} />
  </PageContainer>
}

export default Privacy;