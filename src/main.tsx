import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './App'
// import LocalStore from './utils/localStore'
// import DEFAULT_STORE from './mocks/store.mock'

window.console = window.electronLog
console.log('@@@@@@@ RENDERER STARTED @@@@@@@')

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
)
