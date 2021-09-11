import electronLog from 'electron-log'
import isDev from 'electron-is-dev'

if (!isDev) electronLog.transports.console.level = false

export default electronLog
