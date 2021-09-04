type Browser = {
  exePath: string,
  name: string,
  title: string
}

type Incognito = {
  name: string,
  title: String
}

type Account = {
  name: string,
  title: string,
  profileDirectoryPath: string,
  image: string,
}

type Viewer = {
  id: string,
  channelName: string,
  browser: Browser,
  incognito?: Incognito,
  account?: Account,
  domains: string[],
  isVisible: boolean,
  x: number,
  y: number  
}


const DEFAULT_STORE: any = {
  url: 'https://www.google.com/search?q=google&oq=google&aqs=chrome.0.69i59l3j69i60l2j69i65j69i60j69i65.2933j0j7&sourceid=chrome&ie=UTF-8',
  appVersion: '3.2.0',
  progId: 'AppXshmtx3g30r0k9tzr3jxaegvzpsasy3yv',
  currentPage: '/',
  shouldSaveDomain: false,
  openInFirst: false,
  appClosed: false,
  showHidden: false,
  dragEnabled: false,
  isDefaultBrowser: true,
  grid: [
    {
      id: 'chrome_stable_Private_Default',
      channelName: 'stable',
      browser: {
        exePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        name: 'chrome',
        title: 'Chrome'
      },
      account: {
        name: 'private',
        title: 'Private',
        profileDirectoryPath:
          'C:\\Users\\Marat\\AppData\\Local\\Google\\Chrome\\User Data\\Default',
        image:
          'https://lh3.googleusercontent.com/a-/AOh14GgYWo8I1m3VDYMkWqoj6X4m--Rj99CvREcU0C8nLlY=s96-c'
      },
      domains: ['google.com'],
      isVisible: true,
      x: 0,
      y: 0
    },
    {
      id: 'chrome_stable_incognito_Default',
      channelName: 'stable',
      browser: {
        exePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        name: 'chrome',
        title: 'Chrome'
      },
      incognito: {
        name: 'incognito',
        title: 'Incognito'
      },
      domains: [],
      isVisible: true,
      x: 1,
      y: 0
    },
    {
      id: 'chrome_stable_Simloud_Profile-2',
      channelName: 'stable',
      browser: {
        exePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        name: 'chrome',
        title: 'Chrome'
      },
      account: {
        name: 'simloud',
        title: 'Simloud',
        profileDirectoryPath:
          'C:\\Users\\Marat\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 2',
        image:
          'https://lh3.googleusercontent.com/a/AATXAJwBL1g4lwhHUCCiTOAWwXoOdVCF-1Guu6ZTNtmB=s96-c'
      },
      domains: [],
      isVisible: true,
      x: 2,
      y: 0
    },
    {
      id: 'chrome_stable_zvk_Profile-3',
      channelName: 'stable',
      browser: {
        exePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        name: 'chrome',
        title: 'Chrome'
      },
      account: {
        name: 'zvk',
        title: 'zvk',
        profileDirectoryPath:
          'C:\\Users\\Marat\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 3',
        image:
          'https://lh3.googleusercontent.com/a/AATXAJzelQ89zGUJAvQOP7Tklf9sARBv861G0V9tw84k=s96-c'
      },
      domains: [],
      isVisible: true,
      x: 0,
      y: 1
    },
    {
      id: 'chrome_beta_Пользователь 1_Default',
      channelName: 'beta',
      browser: {
        exePath: 'C:\\Program Files\\Google\\Chrome Beta\\Application\\chrome.exe',
        name: 'chrome',
        title: 'Chrome'
      },
      account: {
        name: 'пользователь 1',
        title: 'Пользователь 1',
        profileDirectoryPath:
          'C:\\Users\\Marat\\AppData\\Local\\Google\\Chrome Beta\\User Data\\Default',
        image: ''
      },
      domains: [],
      isVisible: true,
      x: 1,
      y: 1
    },
    {
      id: 'chrome_beta_incognito_Default',
      channelName: 'beta',
      browser: {
        exePath: 'C:\\Program Files\\Google\\Chrome Beta\\Application\\chrome.exe',
        name: 'chrome',
        title: 'Chrome'
      },
      incognito: {
        name: 'incognito',
        title: 'Incognito'
      },
      domains: [],
      isVisible: true,
      x: 2,
      y: 1
    },
    {
      id: 'chrome_dev_Пользователь 1_Default',
      channelName: 'dev',
      browser: {
        exePath: 'C:\\Program Files\\Google\\Chrome Dev\\Application\\chrome.exe',
        name: 'chrome',
        title: 'Chrome'
      },
      account: {
        name: 'пользователь 1',
        title: 'Пользователь 1',
        profileDirectoryPath:
          'C:\\Users\\Marat\\AppData\\Local\\Google\\Chrome Dev\\User Data\\Default',
        image: ''
      },
      domains: [],
      isVisible: true,
      x: 0,
      y: 2
    },
    {
      id: 'chrome_dev_incognito_Default',
      channelName: 'dev',
      browser: {
        exePath: 'C:\\Program Files\\Google\\Chrome Dev\\Application\\chrome.exe',
        name: 'chrome',
        title: 'Chrome'
      },
      incognito: {
        name: 'incognito',
        title: 'Incognito'
      },
      domains: [],
      isVisible: true,
      x: 1,
      y: 2
    },
    {
      id: 'chrome_canary_Пользователь 1_Default',
      channelName: 'canary',
      browser: {
        exePath:
          'C:\\Users\\Marat\\AppData\\Local\\Google\\Chrome SxS\\Application\\chrome.exe',
        name: 'chrome',
        title: 'Chrome'
      },
      account: {
        name: 'пользователь 1',
        title: 'Пользователь 1',
        profileDirectoryPath:
          'C:\\Users\\Marat\\AppData\\Local\\Google\\Chrome SxS\\User Data\\Default',
        image: ''
      },
      domains: [],
      isVisible: true,
      x: 2,
      y: 2
    },
    {
      id: 'chrome_canary_incognito_Default',
      channelName: 'canary',
      browser: {
        exePath:
          'C:\\Users\\Marat\\AppData\\Local\\Google\\Chrome SxS\\Application\\chrome.exe',
        name: 'chrome',
        title: 'Chrome'
      },
      incognito: {
        name: 'incognito',
        title: 'Incognito'
      },
      domains: [],
      isVisible: true,
      x: 0,
      y: 3
    },
    {
      id: 'firefox_stable',
      channelName: 'stable',
      browser: {
        exePath: 'C:\\Program Files\\Mozilla Firefox\\firefox.exe',
        name: 'firefox',
        title: 'Firefox'
      },
      domains: ['firefox.com/*/google.com'],
      isVisible: true,
      x: 1,
      y: 3
    },
    {
      id: 'firefox_dev',
      channelName: 'dev',
      browser: {
        exePath: 'C:\\Program Files\\Firefox Developer Edition\\firefox.exe',
        name: 'firefox',
        title: 'Firefox'
      },
      domains: [],
      isVisible: true,
      x: 2,
      y: 3
    },
    {
      id: 'brave_stable',
      channelName: 'stable',
      browser: {
        exePath:
          'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
        name: 'brave',
        title: 'Brave'
      },
      domains: [],
      isVisible: true,
      incognitoName: 'private',
      x: 0,
      y: 4
    },
    {
      id: 'brave_beta',
      channelName: 'beta',
      browser: {
        exePath:
          'C:\\Program Files\\BraveSoftware\\Brave-Browser-Beta\\Application\\brave.exe',
        name: 'brave',
        title: 'Brave'
      },
      domains: [],
      isVisible: true,
      incognitoName: 'private',
      x: 1,
      y: 4
    },
    {
      id: 'brave_nightly',
      channelName: 'nightly',
      browser: {
        exePath:
          'C:\\Program Files\\BraveSoftware\\Brave-Browser-Nightly\\Application\\brave.exe',
        name: 'brave',
        title: 'Brave'
      },
      domains: [],
      isVisible: true,
      incognitoName: 'private',
      x: 2,
      y: 4
    },
    {
      id: 'opera_stable',
      channelName: 'stable',
      browser: {
        exePath: 'C:\\Users\\Marat\\AppData\\Local\\Programs\\Opera\\launcher.exe',
        name: 'opera',
        title: 'Opera'
      },
      domains: ['opera.com/google.com'],
      isVisible: true,
      incognitoName: 'private',
      x: 0,
      y: 5
    },
    {
      id: 'opera_beta',
      channelName: 'beta',
      browser: {
        exePath: 'C:\\Users\\Marat\\AppData\\Local\\Programs\\Opera beta\\launcher.exe',
        name: 'opera',
        title: 'Opera'
      },
      domains: [],
      isVisible: true,
      incognitoName: 'private',
      x: 1,
      y: 5
    },
    {
      id: 'opera_dev',
      channelName: 'dev',
      browser: {
        exePath:
          'C:\\Users\\Marat\\AppData\\Local\\Programs\\Opera developer\\launcher.exe',
        name: 'opera',
        title: 'Opera'
      },
      domains: [],
      isVisible: true,
      incognitoName: 'private',
      x: 2,
      y: 5
    },
    {
      id: 'vivaldi_stable_Person-1_Default',
      channelName: 'stable',
      browser: {
        exePath: 'C:\\Users\\Marat\\AppData\\Local\\Vivaldi\\Application\\vivaldi.exe',
        name: 'vivaldi',
        title: 'Vivaldi'
      },
      account: {
        name: 'person 1',
        title: 'Person 1',
        profileDirectoryPath:
          'C:\\Users\\Marat\\AppData\\Local\\Vivaldi\\User Data\\Default',
        image: ''
      },
      domains: [],
      isVisible: true,
      x: 0,
      y: 6
    },
    {
      id: 'vivaldi_stable_incognito_Default',
      channelName: 'stable',
      browser: {
        exePath: 'C:\\Users\\Marat\\AppData\\Local\\Vivaldi\\Application\\vivaldi.exe',
        name: 'vivaldi',
        title: 'Vivaldi'
      },
      incognito: {
        name: 'incognito',
        title: 'Incognito'
      },
      domains: [],
      isVisible: true,
      x: 1,
      y: 6
    },
    {
      id: 'edge_stable_Marat_Default',
      channelName: 'stable',
      browser: {
        exePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        name: 'edge',
        title: 'Edge'
      },
      account: {
        name: 'marat',
        title: 'Marat',
        profileDirectoryPath:
          'C:\\Users\\Marat\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default',
        image: ''
      },
      domains: [],
      isVisible: true,
      x: 2,
      y: 6
    },
    {
      id: 'edge_stable_inprivate_Default',
      channelName: 'stable',
      browser: {
        exePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        name: 'edge',
        title: 'Edge'
      },
      incognito: {
        name: 'inprivate',
        title: 'Inprivate'
      },
      domains: [],
      isVisible: true,
      x: 0,
      y: 7
    },
    {
      id: 'edge_beta_Marat_Default',
      channelName: 'beta',
      browser: {
        exePath: 'C:\\Program Files (x86)\\Microsoft\\Edge Beta\\Application\\msedge.exe',
        name: 'edge',
        title: 'Edge'
      },
      account: {
        name: 'marat',
        title: 'Marat',
        profileDirectoryPath:
          'C:\\Users\\Marat\\AppData\\Local\\Microsoft\\Edge Beta\\User Data\\Default',
        image: ''
      },
      domains: [],
      isVisible: true,
      x: 1,
      y: 7
    },
    {
      id: 'edge_beta_inprivate_Default',
      channelName: 'beta',
      browser: {
        exePath: 'C:\\Program Files (x86)\\Microsoft\\Edge Beta\\Application\\msedge.exe',
        name: 'edge',
        title: 'Edge'
      },
      incognito: {
        name: 'inprivate',
        title: 'Inprivate'
      },
      domains: [],
      isVisible: true,
      x: 2,
      y: 7
    },
    {
      id: 'edge_dev_Marat_Default',
      channelName: 'dev',
      browser: {
        exePath: 'C:\\Program Files (x86)\\Microsoft\\Edge Dev\\Application\\msedge.exe',
        name: 'edge',
        title: 'Edge'
      },
      account: {
        name: 'marat',
        title: 'Marat',
        profileDirectoryPath:
          'C:\\Users\\Marat\\AppData\\Local\\Microsoft\\Edge Dev\\User Data\\Default',
        image: ''
      },
      domains: [],
      isVisible: true,
      x: 0,
      y: 8
    },
    {
      id: 'edge_dev_inprivate_Default',
      channelName: 'dev',
      browser: {
        exePath: 'C:\\Program Files (x86)\\Microsoft\\Edge Dev\\Application\\msedge.exe',
        name: 'edge',
        title: 'Edge'
      },
      incognito: {
        name: 'inprivate',
        title: 'Inprivate'
      },
      domains: [],
      isVisible: true,
      x: 1,
      y: 8
    },
    {
      id: 'edge_canary_Marat_Default',
      channelName: 'canary',
      browser: {
        exePath:
          'C:\\Users\\Marat\\AppData\\Local\\Microsoft\\Edge SxS\\Application\\msedge.exe',
        name: 'edge',
        title: 'Edge'
      },
      account: {
        name: 'marat',
        title: 'Marat',
        profileDirectoryPath:
          'C:\\Users\\Marat\\AppData\\Local\\Microsoft\\Edge SxS\\User Data\\Default',
        image: ''
      },
      domains: [],
      isVisible: true,
      x: 2,
      y: 8
    },
    {
      id: 'edge_canary_inprivate_Default',
      channelName: 'canary',
      browser: {
        exePath:
          'C:\\Users\\Marat\\AppData\\Local\\Microsoft\\Edge SxS\\Application\\msedge.exe',
        name: 'edge',
        title: 'Edge'
      },
      incognito: {
        name: 'inprivate',
        title: 'Inprivate'
      },
      domains: [],
      isVisible: true,
      x: 0,
      y: 9
    }
  ]
}

export default DEFAULT_STORE
