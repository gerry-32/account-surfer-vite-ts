import electronLog from './log'
import wcmatch from 'wildcard-match'
// hash: ""
// host: "vm.tiktok.com:3000"
// hostname: "vm.tiktok.com"
// href: "https://vm.tiktok.com:3000/2wefj239j?=233"
// origin: "https://vm.tiktok.com:3000"
// password: ""
// pathname: "/2wefj239j"
// port: "3000"
// protocol: "https:"

export const getUrlObj = (url: any) => {
  try {
    const urlObj = new URL(url)
    return {
      host: urlObj.host.replace('www.', ''),
      protocol: urlObj.protocol.replace(':', '')
    }
  } catch (e) {
    electronLog.error(e)
    return false
  }
}

export const findDomainInViewer = (grid: any, url: any) => {
  if (url && grid.length && grid.some((account: any) => account.savedDomains.length)) {
    const urlObj = getUrlObj(url)
    if (urlObj) {
      const foundAccount = grid.find((account: any) =>
        account.savedDomains.some((savedDomainObj: any) => {
          if (savedDomainObj.protocols.includes(urlObj.protocol)) {
            const domainWithWildcardOrSlash = /\*|\//g.test(savedDomainObj.host)
            if (domainWithWildcardOrSlash) {
              const testMatch = wcmatch(savedDomainObj.host)
              return testMatch(url)
            } else {
              return urlObj.host.includes(savedDomainObj.host)
            }
          }
        })
      )
      return foundAccount
    }
  }
  return false
}

export const getUrlFromArgv = (argv: any) => {
  if (argv.length < 2) return '' // no url passed
  try {
    const possibleUrl = [...argv].pop()
    const url = new URL(possibleUrl)
    return url.href
  } catch (e) {
    // not valid URL
    return ''
  }
}
