import Store from 'electron-store'

export const initStore = () => {
  const store = new Store({
    watch: true,
    schema: {
      appVersion: {
        type: 'string',
        default: ''
      },
      isDev: {
        type: 'boolean',
        default: false
      },
      isDefaultBrowser: {
        type: 'boolean',
        default: false
      },
      unshortenUrls: {
        type: 'boolean',
        default: false
      },
      url: {
        type: 'string',
        default: ''
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
  })
  // store.openInEditor()
  return store
}
