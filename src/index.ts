import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './App'
import LocalStore from './utils/localStore'
import DEFAULT_STORE from './mocks/store.mock'

if (process.env.NODE_ENV === 'development') {
  window.AS = {
    localStore: new LocalStore(),
    ipcRenderer: { send: eventName => console.log('ipcRenderer: ', eventName) },
    store: {
      data: DEFAULT_STORE,
      set: (fieldName, val) => console.log('store set', fieldName, val),
      get: fieldName => DEFAULT_STORE[fieldName]
    }
  }
}

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
)
