import { Text } from '@tarojs/components'
import classNames from 'classnames';

const Interact: React.FC<Partial<Pick<API.ConversationInfoVM, 'likes' | 'comments' | 'favorites' | 'views'>> & GetIProps<typeof Text>> = (props) => {
  const { likes, comments, favorites, className, views, ...resetProps } = props
  return <Text className={classNames('text-gray text-sm', className)} {...resetProps}>
    <Text className='margin-right-xs'>{comments || 0}</Text>评论｜<Text className='margin-right-xs'>{likes || 0}</Text> 点赞｜
    <Text className='margin-right-xs'>{favorites || 0}</Text>收藏 | <Text className='margin-right-xs'>{views || 0}</Text>浏览
  </Text>
}

export default Interact;