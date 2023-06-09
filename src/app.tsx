import { Component } from 'react'
import { Provider } from 'react-redux'
import dayjs from 'dayjs';
import { getLaunchOptionsSync, showShareMenu } from '@tarojs/taro';

import './app.scss'
import './assets/style/app.css';
import './assets/style/animation.css';
import { actions, store } from './store'
import { setLocalStorage, initLogin } from './utils';

class App extends Component {

  constructor(props: {}) {
    super(props)
  }

  componentDidMount() { }

  onLaunch() {
    showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    } as any)
    const launchOptions = getLaunchOptionsSync() || {}
    if (launchOptions.query?.inviteCode) {
      setLocalStorage('inviteCode', launchOptions.query?.inviteCode)
    }

    const { token } = store.getState().common;
    if (!token?.val || +dayjs().unix() - (token?.time || 0) > 60 * 60 * 24 * 3) {
      console.log('init login')
      initLogin()
    } else {
      actions.getUserInfo()
      actions.checkStatus()
    }
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  render() {
    return <Provider store={store}>
      {this.props.children}
    </Provider>
  }
}

// const App: React.FC = (props) => {
//   return <Provider store={store}>
//     {props.children}
//   </Provider>
// }

export default App
