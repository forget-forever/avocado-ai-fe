import { Card, CopyIcon, ListItem, Logo, PageContainer, TimeShow } from "@/components"
import { useData } from "@/hooks";
import { AtAvatar, AtList } from "taro-ui";
import styles from './index.module.scss'

const UserInfo: React.FC = () => {
  const { header, name, userName, remainCount, usedCount, inviteCount, inviteCode, phoneMask, phoneStatus, lastLogin } = useData((s) => s.common.userInfo) || {}

  return <PageContainer title='个人信息'>
    <Card title='基本信息' className='margin-top'>
    <AtAvatar image={header} circle className='animation-ripple margin-top center' />
      <AtList className={styles.userinfoList} hasBorder={false}>
        <ListItem iconNode='名称' arrowIcon='' icon={styles.itemIcon}>
          {name}
        </ListItem>
        <ListItem iconNode='用户名' arrowIcon='' icon={styles.itemIcon}>
          {userName}
        </ListItem>
        <ListItem iconNode='剩余' icon={styles.itemIcon} note={<Logo />}>
          {remainCount}
        </ListItem>
        <ListItem iconNode='共使用' arrowIcon='' icon={styles.itemIcon} note={<Logo />}>
          {usedCount}
        </ListItem>
        <ListItem iconNode='共邀请' arrowIcon='' icon={styles.itemIcon} note='人'>
          {inviteCount}
        </ListItem>
        <ListItem
          iconNode='邀请码'
          icon={styles.itemIcon}
          hasBorder={false}
          note={<CopyIcon text={inviteCode} />}
        >
          {inviteCode}
        </ListItem>
      </AtList>
    </Card>
    <Card title='安全信息' className='margin-top'>
      <AtList className={styles.userinfoList} hasBorder={false}>
        <ListItem iconNode='绑定手机' arrowIcon='' icon={styles.itemIcon}>
          {phoneStatus ? phoneMask : '未绑定'}
        </ListItem>
        <ListItem iconNode='绑定微信' arrowIcon='' icon={styles.itemIcon}>
          未绑定
        </ListItem>
        <ListItem iconNode='最后登陆' arrowIcon='' icon={styles.itemIcon} hasBorder={false}>
          <TimeShow value={lastLogin} />
        </ListItem>
      </AtList>
    </Card>
  </PageContainer>
}

export default UserInfo;