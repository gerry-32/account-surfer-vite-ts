import path from 'path'
import { app } from 'electron'
// const fs = require("fs");
// import https from 'https'
// import base64Img from 'base64-img'
// const { t } = require("typy");
// // import { startLogging } from './log'
// import getRemoteAvatar from './getRemoteAvatar'
import {
  getChromiumAccount
  // generateProfileId,
} from '../getChromiumAccount_old'

const WINUSER_DIRECTORY = app.getPath('home')

const allProgramFilesLocations = (path: any) => [
  `C:\\Program Files\\${path}`,
  `C:\\Program Files (x86)\\${path}`,
  `D:\\Program Files\\${path}`,
  `D:\\Program Files (x86)\\${path}`,
  `E:\\Program Files\\${path}`,
  `E:\\Program Files (x86)\\${path}`
]

export const browserLocations = [
  {
    browserName: 'chrome',
    incognitoName: 'incognito',
    channels: [
      {
        channelName: 'stable',
        accountDetails: {
          resolver: getChromiumAccount,
          userDataFolderPath: 'AppData\\Local\\Google\\Chrome\\User Data',
          infoXPath: {
            fullName: 'profile.name',
            pictureUrl: 'account_info[0].picture_url'
          }
        },
        exePaths: [
          ...allProgramFilesLocations('Google\\Chrome\\Application\\chrome.exe'),
          path.join(
            WINUSER_DIRECTORY,
            'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
          )
        ]
      },
      {
        channelName: 'beta',
        accountDetails: {
          resolver: getChromiumAccount,
          userDataFolderPath: 'AppData\\Local\\Google\\Chrome Beta\\User Data',
          infoXPath: {
            fullName: 'profile.name',
            pictureUrl: 'account_info[0].picture_url'
          }
        },
        exePaths: allProgramFilesLocations('Google\\Chrome Beta\\Application\\chrome.exe')
      },
      {
        channelName: 'dev',
        accountDetails: {
          resolver: getChromiumAccount,
          userDataFolderPath: 'AppData\\Local\\Google\\Chrome Dev\\User Data',
          infoXPath: {
            fullName: 'profile.name',
            pictureUrl: 'account_info[0].picture_url'
          }
        },
        exePaths: allProgramFilesLocations('Google\\Chrome Dev\\Application\\chrome.exe')
      },
      {
        channelName: 'canary',
        accountDetails: {
          resolver: getChromiumAccount,
          userDataFolderPath: 'AppData\\Local\\Google\\Chrome SxS\\User Data',
          infoXPath: {
            fullName: 'profile.name',
            pictureUrl: 'account_info[0].picture_url'
          }
        },
        exePaths: [
          ...allProgramFilesLocations('Google\\Chrome SxS\\Application\\chrome.exe'),
          path.join(
            WINUSER_DIRECTORY,
            'AppData\\Local\\Google\\Chrome SxS\\Application\\chrome.exe'
          )
        ]
      }
    ]
  },
  {
    browserName: 'firefox',
    channels: [
      {
        channelName: 'stable',
        exePaths: allProgramFilesLocations('Mozilla Firefox\\firefox.exe')
      },
      {
        channelName: 'dev',
        exePaths: allProgramFilesLocations('Firefox Developer Edition\\firefox.exe')
      },
      {
        channelName: 'nightly',
        exePaths: allProgramFilesLocations('Firefox Nightly\\firefox.exe')
      }
    ]
  },
  {
    browserName: 'brave',
    incognitoName: 'private',
    channels: [
      {
        channelName: 'stable',
        exePaths: allProgramFilesLocations(
          'BraveSoftware\\Brave-Browser\\Application\\brave.exe'
        )
      },
      {
        channelName: 'beta',
        exePaths: allProgramFilesLocations(
          'BraveSoftware\\Brave-Browser-Beta\\Application\\brave.exe'
        )
      },
      {
        channelName: 'nightly',
        exePaths: allProgramFilesLocations(
          'BraveSoftware\\Brave-Browser-Nightly\\Application\\brave.exe'
        )
      }
    ]
  },
  {
    browserName: 'polypane',
    channels: [
      {
        channelName: 'stable',
        exePaths: allProgramFilesLocations('Polypane\\Polypane.exe')
      }
    ]
  },

  {
    browserName: 'opera',
    incognitoName: 'private',
    channels: [
      {
        channelName: 'stable',
        exePaths: [
          path.join(WINUSER_DIRECTORY, 'AppData\\Local\\Programs\\Opera\\launcher.exe'),
          ...allProgramFilesLocations('Opera\\launcher.exe')
        ]
      },
      {
        channelName: 'beta',
        exePaths: [
          path.join(
            WINUSER_DIRECTORY,
            'AppData\\Local\\Programs\\Opera beta\\launcher.exe'
          ),
          ...allProgramFilesLocations('Opera beta\\launcher.exe')
        ]
      },
      {
        channelName: 'dev',
        exePaths: [
          path.join(
            WINUSER_DIRECTORY,
            'AppData\\Local\\Programs\\Opera developer\\launcher.exe'
          ),
          ...allProgramFilesLocations('Opera developer\\launcher.exe')
        ]
      }
    ]
  },

  {
    browserName: 'vivaldi',
    incognitoName: 'incognito',
    channels: [
      {
        channelName: 'stable',
        exePaths: [
          path.join(
            WINUSER_DIRECTORY,
            'AppData\\Local\\Vivaldi\\Application\\vivaldi.exe'
          ),
          ...allProgramFilesLocations('Vivaldi\\Application\\vivaldi.exe')
        ],
        accountDetails: {
          resolver: getChromiumAccount,
          userDataFolderPath: 'AppData\\Local\\Vivaldi\\User Data',
          infoXPath: {
            fullName: 'profile.name',
            pictureUrl: ''
          }
        }
      }
    ]
  },
  {
    browserName: 'edge',
    incognitoName: 'inprivate',
    channels: [
      {
        channelName: 'stable',
        accountDetails: {
          resolver: getChromiumAccount,
          userDataFolderPath: 'AppData\\Local\\Microsoft\\Edge\\User Data',
          infoXPath: {
            fullName: 'account_info[0].edge_account_first_name',
            pictureUrl: 'account_info[0].picture_url'
          }
        },
        exePaths: [
          ...allProgramFilesLocations('Microsoft\\Edge\\Application\\msedge.exe'),
          path.join(
            WINUSER_DIRECTORY,
            'AppData\\Local\\Microsoft\\Edge\\Application\\msedge.exe'
          )
        ]
      },
      {
        channelName: 'beta',
        accountDetails: {
          resolver: getChromiumAccount,
          userDataFolderPath: 'AppData\\Local\\Microsoft\\Edge Beta\\User Data',
          infoXPath: {
            fullName: 'account_info[0].edge_account_first_name',
            pictureUrl: 'account_info[0].picture_url'
          }
        },
        exePaths: [
          ...allProgramFilesLocations('Microsoft\\Edge Beta\\Application\\msedge.exe'),
          path.join(
            WINUSER_DIRECTORY,
            'AppData\\Local\\Microsoft\\Edge Beta\\Application\\msedge.exe'
          )
        ]
      },
      {
        channelName: 'dev',
        accountDetails: {
          resolver: getChromiumAccount,
          userDataFolderPath: 'AppData\\Local\\Microsoft\\Edge Dev\\User Data',
          infoXPath: {
            fullName: 'account_info[0].edge_account_first_name',
            pictureUrl: 'account_info[0].picture_url'
          }
        },
        exePaths: [
          ...allProgramFilesLocations('Microsoft\\Edge Dev\\Application\\msedge.exe'),
          path.join(
            WINUSER_DIRECTORY,
            'AppData\\Local\\Microsoft\\Edge Dev\\Application\\msedge.exe'
          )
        ]
      },
      {
        channelName: 'canary',
        accountDetails: {
          resolver: getChromiumAccount,
          userDataFolderPath: 'AppData\\Local\\Microsoft\\Edge SxS\\User Data',
          infoXPath: {
            fullName: 'account_info[0].edge_account_first_name',
            pictureUrl: 'account_info[0].picture_url'
          }
        },
        exePaths: [
          ...allProgramFilesLocations('Microsoft\\Edge SxS\\Application\\msedge.exe'),
          path.join(
            WINUSER_DIRECTORY,
            'AppData\\Local\\Microsoft\\Edge SxS\\Application\\msedge.exe'
          )
        ]
      }
    ]
  }
]
