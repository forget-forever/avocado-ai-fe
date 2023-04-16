import { Component } from 'react'
import { Provider } from 'react-redux'
import dayjs from 'dayjs';
import './app.scss'
import './assets/style/app.css';
import './assets/style/animation.css';
import { actions, store } from './store'
import { initLogin } from './utils/init';

class App extends Component {

  constructor(props: {}) {
    super(props)
  }

  componentDidMount () {}

  onLaunch () {
    if (process.env.TARO_ENV !== 'h5') {
      const { token } = store.getState().common;
      if (+dayjs().unix() - (token?.time || 0) >  60 * 60 * 24 * 300) {
        console.log('init login')
        // initLogin()
      } else {
        actions.getUserInfo()
      }
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  render () {
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
