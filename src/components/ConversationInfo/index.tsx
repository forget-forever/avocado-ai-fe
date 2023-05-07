import { getCheckStatusText } from "@/utils/enum";
import { View, Text } from "@tarojs/components"
import { useMemo } from "react";
import { AtAvatar, AtTag } from "taro-ui"

import TimeShow from "../TimeShow";
import Interact from "./Interact";

const Tags: React.FC<{
  tags?: string[] | string;
}> = (props) => {
  const {tags} = props

  const tagsShow = useMemo(() => {
    if (!tags) {
      return []
    }
    if (Array.isArray(tags)) {
      return tags
    }
    return tags?.split(/[\|,\s.，]/) || []
  }, [tags])

  return <>
    {tagsShow?.map((ele) => <AtTag type='primary' key={ele} size='small' className='margin-right-xs'>{ele}</AtTag>)}
  </>
}

const ConversationInfo: React.FC<Partial<API.ConversationInfoVM>> & {
  Interact: typeof Interact;
  Tags: typeof Tags;
} = (props) => {
  const { header, name, categoryName, roleDescription, updateTime, checkStatus, city, children } = props;

  return <View className='bg-white padding'>
    <View className='flex align-items'>
      <AtAvatar image={header} circle />
      <View className='flex-fill padding text-sm'>
        <View className='text-gray'>{name}</View>
        <View>{categoryName}</View>
      </View>
    </View>
    <View>
      <Tags tags={roleDescription} />
    </View>
    <View className='text-sm margin-top-xs flex align-items'>
      {checkStatus !== undefined && <Text className='margin-right-xs'>
        {getCheckStatusText(checkStatus)}
      </Text>}
      {updateTime && <Text className='right'>发布于<TimeShow value={updateTime} />{city && <Text>｜{city}</Text>}</Text>}
    </View>
    {children}
  </View>
}

ConversationInfo.Interact = Interact;
ConversationInfo.Tags = Tags;

export default ConversationInfo;
