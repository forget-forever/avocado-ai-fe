import { login } from '@tarojs/taro'
import { Component } from 'react'
import './app.scss'

class App extends Component {

  componentDidMount () {}

  onLaunch () {
    login({
      success: (res) => {
        console.log(`login code: ${res.code}`);
      }
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
