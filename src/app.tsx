import { Component } from 'react'
import { Provider } from 'react-redux'
import moment from 'moment';
import './app.scss'
import './assets/style/app.css';
import './assets/style/animation.css';
import { store } from './store'
import { initH5, initLogin } from './utils/init';

class App extends Component {

  componentDidMount () {}

  onLaunch () {
    if (process.env.TARO_ENV !== 'h5') {
      const { token } = store.getState().common;
      if (+moment().format('x') - (token?.time || 0) > 1000 * 60 * 3) {
        initLogin()
      }
    } else {
      initH5()
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return <Provider store={store}>
      {this.props.children}
    </Provider>
  }
}

export default App
