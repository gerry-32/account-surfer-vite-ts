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
import operaLocations from './opera'
import vivaldiLocations from './vivaldi'
import edgeLocations from './edge'
import polypaneLocations from './polypane'

export default [
  ...chromeLocations,
  ...firefoxLocations,
  ...braveLocations,
  ...operaLocations,
  ...vivaldiLocations,
  ...edgeLocations,
  ...polypaneLocations
]
