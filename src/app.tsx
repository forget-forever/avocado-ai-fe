import { Component } from 'react'
import { Provider } from 'react-redux'
import dayjs from 'dayjs';
import { getLaunchOptionsSync } from '@tarojs/taro';

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
    const launchOptions = getLaunchOptionsSync() || {}
    if (launchOptions.query?.inviteCode) {
      setLocalStorage('inviteCode', launchOptions.query?.inviteCode)
    }

    const { token } = store.getState().common;
    if (+dayjs().unix() - (token?.time || 0) > 60 * 60 * 24 * 300) {
      console.log('init login')
      initLogin()
    } else {
      actions.getUserInfo()
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
