import { View, Text } from "@tarojs/components"
import { useMemo } from "react";
import { AtAvatar, AtTag } from "taro-ui"

import TimeShow from "../TimeShow";
import Interact from "./Interact";

const ConversationInfo: React.FC<Partial<API.ConversationInfoVM>> & {
  Interact: typeof Interact
} = (props) => {
  const { header, name, categoryName, roleDescription, views, updateTime, city, children } = props;
  
  const tags = useMemo(() => {
    return roleDescription?.split(/[\|,\s.，]/) || []
  }, [roleDescription])

  return <View className='bg-white padding'>
    <View className='flex align-items'>
      <AtAvatar image={header} circle />
      <View className='flex-fill padding'>
        <View className='text-gray'>{name}</View>
        <View>{categoryName}</View>
      </View>
    </View>
    <View>
      {tags.map((ele) => <AtTag type='primary' key={ele} size='small' className='margin-right-xs'>{ele}</AtTag>) }
    </View>
    <View className='text-sm margin-top-xs flex align-items'>
      <Text className='margin-right-xs'>审核中，仅自己可见</Text>
      <Text className='iconfont icon-view text-lg' />{views}
      <Text className='right'>发布于<TimeShow value={updateTime} />{city && <Text>｜{city}</Text>}</Text>
    </View>
    {children}
  </View>
}

ConversationInfo.Interact = Interact;

export default ConversationInfo;
