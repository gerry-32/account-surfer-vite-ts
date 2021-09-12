// const fs = require("fs");
// import https from 'https'
// import base64Img from 'base64-img'
// const { t } = require("typy");
// // import { startLogging } from './log'
// import getRemoteAvatar from './getRemoteAvatar'
// import {
//   getChromiumAccount
//   // generateProfileId,
// } from './getChromiumAccount'
import chromeLocations from './chrome'
import firefoxLocations from './firefox'
import braveLocations from './brave'
import polypaneLocations from './polypane'
import operaLocations from './opera'
import vivaldiLocations from './vivaldi'

export default [
  ...chromeLocations,
  ...firefoxLocations,
  ...braveLocations,
  ...polypaneLocations,
  ...operaLocations,
  ...vivaldiLocations
]
