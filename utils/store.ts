import Store from 'electron-store'
import { version } from '../package.json'

let store

export const initStore = () => {
  const schema: any = {
    isDefaultBrowser: {
      type: 'boolean',
      default: false
    },
    url: {
      type: 'string',
      default: ''
    },
    appVersion: {
      type: 'string',
      default: version
    },
    progId: {
      type: 'string',
      default: ''
    },
    currentPage: {
      type: 'string',
      default: '/'
    },
    shouldSaveDomain: {
      type: 'boolean',
      default: false
    },
    openInFirst: {
      type: 'boolean',
      default: false
    },
    appClosed: {
      type: 'boolean',
      default: false
    },
    showHidden: {
      type: 'boolean',
      default: false
    },
    dragEnabled: {
      type: 'boolean',
      default: false
    },
    grid: {
      type: 'array',
      default: []
    }
  }

  store = new Store({
    watch: true,
    schema
  })

  // store.openInEditor()

  return store
}
