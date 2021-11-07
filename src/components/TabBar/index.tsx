import { Component } from '@tarojs/taro';
import { AtTabBar }  from 'taro-ui';
import { TabItem } from 'taro-ui/types/tab-bar';
import app from '../../app.config'

interface TabBar {
  state: {
    current: number;
    tabList: TabItem[];
  }
}
class TabBar extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      tabList: app.tabBar.list.map((item) => ({
        title: item.text,
        image: `/${item.iconPath}`,
        selectedImage: `/${item.selectedIconPath}`
      }))
    }
  }
  handleClick (index: number) {
    this.setState({
      current: index
    })
  }
  render () {
    const { tabList } = this.state;
    return (
      <AtTabBar
        tabList={tabList}
        onClick={this.handleClick.bind(this)}
        current={this.state.current}
        fixed
      />
    )
  }
}

export default TabBar;
