import { ConversationType } from "@/utils/enum"

declare global {
  declare namespace API {
    type DrawingPictureDetailInfoVM = ISmallCamel<{
      Id: number
      /// <summary>
      /// 用户名
      /// </summary>
      UserName: string
      /// <summary>
      /// guid,唯一id
      /// </summary>
      PictureId: string
      /// <summary>
      /// 画图类型
      /// </summary>
      DrawType: number
      /** 风格 */
      Styles: string
      /** 艺术家 */
      Artists: string
      Tags: string
      NegativeTags: string
      NegativePrompt: string
      /// <summary>
      /// 生成的图片宽度
      /// </summary>
      Width: number
      /// <summary>
      /// 生成的图片高度
      /// </summary>
      Height: number
    
      FileSize: number
    
      /// <summary>
      /// 文件大小字符串
      /// </summary>
      FileSizeStr: string
      Header: string
      Name: string
      //是否有版权
      IsOwner: boolean
      //购买版权的用户数量
      OwnerCount: number
      /// <summary>
      /// 图片的链接，如果用户有所有权，他看到的就没水印
      /// </summary>
      Url: string
      //点赞数量
      Likes: number
      Favorites: number
      //评论数量
      Comments: number
      Views: number
      IsLike: boolean
      IsView: boolean
      IsComment: boolean
      IsFavorite: boolean
      CheckStatus: number
      CreateTime: Date
    
      /// <summary>
      /// guid,唯一id
      /// </summary>
      DrawingId: string
      /// <summary>
      /// guid,唯一id
      /// </summary>
      ConversationId: string
      /// <summary>
      /// 画图类型
      /// </summary>
      DrawType: number
      /// <summary>
      /// 文本
      /// </summary>
      Prompt: string
      /// <summary>
      /// 文本英文
      /// </summary>
      PromptEn: string
      /// <summary>
      /// 文本英文(消极)
      /// </summary>
      NegativePromptEn: string
      /// <summary>
      /// 种子
      /// </summary>
      Seed: number
      /// <summary>
      /// 1-30越大代表和训练原图越相似，随机度 默认7
      /// </summary>
      CFG: number
      /// <summary>
      /// 取样方法 默认Euler a
      /// </summary>
      SamplingMethod: number
      /// <summary>
      /// 取样步数量，一般越大细节越多，1-150，推荐20-30
      /// </summary>
      Steps: number
      /// <summary>
      /// 是否重建脸部，突出脸部细节
      /// </summary>
      RestoreFaces: boolean
    
      /// <summary>
      /// img2img的参数 图片裁剪模式
      /// </summary>
      ResizeMode: string
    
      /// <summary>
      /// img2img的参数和原图的相识程度
      /// </summary>
      DenoisingStrength: number
      /// <summary>
      /// 图片数量
      /// </summary>
      ImageCount: number
    
      /// <summary>
      /// 状态
      /// </summary>
      DrawingStatus: number
      /// <summary>
      /// 尺寸放大倍数
      /// </summary>
      Resize: number
      /// <summary>
      /// 模型是否支持中文
      /// </summary>
      SupportChinese: boolean
      /// <summary>
      /// 模型名称
      /// </summary>
      ModelName: string
      /// <summary>
      /// 属性名称
      /// </summary>
      Property: string
      /// <summary>
      /// 比例名称
      /// </summary>
      Ratio: string
      ConversationId: string
    }>
    type DrawingPictureQuery = ISmallCamel<BasePageQuery & {
      ModelId?: string
      IsExample?: boolean
    }>
  
    type DrawingModelInfoVM = ISmallCamel<{
      Id: number
      ModelId: string
      /// <summary>
      /// 模型名称
      /// </summary>
      ModelName: string
      /// <summary>
      /// 1-30越大代表和训练原图越相似，随机度 默认7
      /// </summary>
      CFG: string
      /// <summary>
      /// 取样方法 默认Euler a
      /// </summary>
      SamplingMethod: string
      /// <summary>
      /// 取样步数量，一般越大细节越多，1-150，推荐20-30
      /// </summary>
      Steps: number
      /// <summary>
      /// 是否重建脸部，突出脸部细节
      /// </summary>
      RestoreFaces: string
      /// <summary>
      /// img2img的参数 图片裁剪模式
      /// </summary>
      ResizeMode: string
      /// <summary>
      /// img2img的参数和原图的相识程度
      /// </summary>
      DenoisingStrength: number
      /// <summary>
      /// 宽度
      /// </summary>
      Width: number
      /// <summary>
      /// 高度
      /// </summary>
      Height: number
      Description?: string
      Description: string
      PropertyList: DrawingModelPropertyInfoVM[]
      UsedCount: number;
      Width?: number;
      Height?: number
    }>
  
    type RatioItemType = ISmallCamel<{
      Id: number
      Label: string
      ModelId: string
      PropertyId: string
      RatioId: string
    }>
  
    type PropertiesType = ISmallCamel<{
      Id: number
      Label: string
      MaxImageCount: number
      PropertyId: string
      RatioList: RatioItemType[]
      Resize: number
      StepCost: number
    }>
  
    interface DrawingParamsVM {
      Artists: string[]
      Styles: string[]
      SamplingMethods: string[]
      Models: DrawingModelInfoVM[]
      ResizeModes: string[]
      TagCategories: string[]
      NegativeTagCategories: string[];
      Properties: PropertiesType[]
    }
  
    type CreateDrawingVM = ISmallCamel<{
      /// <summary>
      /// 模型id
      /// </summary>
      ModelId: string
      /// <summary>
      /// 画图类型
      /// </summary>
      DrawType: string
      /// <summary>
      /// 文本
      /// </summary>
      Prompt: string
      /// <summary>
      /// 风格
      /// </summary>
      Styles?: string[]
      /// <summary>
      /// 艺术家
      /// </summary>
      Artists?: string[]
      //提示词
      Tags?: string[]
      //消极提示词
      NegativeTags?: []
      /// <summary>
      /// 图片比例，默认1
      /// </summary>
      RatioId?: string;
      
      PropertyId: string;
      /// <summary>
      /// 生成图片质量
      /// </summary>
      Quality?: number
      /// <summary>
      /// 1-30越大代表和训练原图越相似，随机度 默认7
      /// </summary>
      CFG?: number
      /// <summary>
      /// 取样方法 默认Euler a
      /// </summary>
      SamplingMethod: string
      /// <summary>
      /// 取样步数量，一般越大细节越多，1-150，推荐20-30
      /// </summary>
      Steps?: number
      /// <summary>
      /// 是否重建脸部，突出脸部细节
      /// </summary>
      RestoreFaces?: boolean
      /// <summary>
      /// img2img的参数 图片裁剪模式
      /// </summary>
      ResizeMode?: number
      /// <summary>
      /// 原图路径 img2img的参数
      /// </summary>
      SourceImgSrc?: string
      /// <summary>
      /// img2img的参数和原图的相识程度
      /// </summary>
      DenoisingStrength?: number
      /// <summary>
      /// 图片数量
      /// </summary>
      ImageCount: int
      //是否发布到话题
      IsPublic?: boolean;
      NegativePrompt?: string;
      /** 种子 */
      Seed: number;
    }>
  
    type OwnershipInfoVM = ISmallCamel<{
      Id: number
      /// <summary>
      /// 用户名
      /// </summary>
      UserName: string
      /// <summary>
      /// 名称
      /// </summary>
      Name: string
      /// <summary>
      /// 头像
      /// </summary>
      Header: string
      /// <summary>
      /// guid,唯一id
      /// </summary>
      OwnershipId: string
      /// <summary>
      /// 标题
      /// </summary>
      Title: string
      /// <summary>
      /// 物品类型
      /// </summary>
      ObjectType: number
      /// <summary>
      /// 销售价格
      /// </summary>
      Price: number
    
      SourceType: number
      /// <summary>
      /// 来源编码
      /// </summary>
      SourceCode: string
      /// <summary>
      /// 获得时间
      /// </summary>
      OwnershipTime: string
      /// <summary>
      /// 备注
      /// </summary>
      Note: string
      Image: string
    }>
  
    type OwnershipQuery = BasePageQuery & ISmallCamel<{
      UserName?: string
      SourceCode?: string
      SourceType?: string;
      ConversationType: ConversationType
    }>

    type GetContentWithoutWatermarkVM = ISmallCamel<{
      Content: string
    }>

    type NoWatermarkContentInfoVM = ISmallCamel<{
      ContentId: string
      ContentUrl?: string
      UserName: string
      Img: string
      Title: string
      Pics?: string[]
    }>
  }
}