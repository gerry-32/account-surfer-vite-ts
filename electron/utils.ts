import electronLog from './log'
// hash: ""
// host: "vm.tiktok.com:3000"
// hostname: "vm.tiktok.com"
// href: "https://vm.tiktok.com:3000/2wefj239j?=233"
// origin: "https://vm.tiktok.com:3000"
// password: ""
// pathname: "/2wefj239j"
// port: "3000"
// protocol: "https:"

export const extractHostAndProtocol = (url: any) => {
  try {
    const urlObj = new URL(url)
    return {
      host: urlObj.host.replace('www.', ''),
      protocol: urlObj.protocol.replace(':', '')
    }
  } catch (e) {
    electronLog.error(e)
    return {}
  }
}

export const findDomainInViewer = (grid: any, url: any) => {
  if (url && grid.length && grid.some((account: any) => account.savedDomains.length)) {
    const { host, protocol } = extractHostAndProtocol(url)
    if (host && protocol) {
      const foundAccount = grid.find((account: any) =>
        account.savedDomains.some((domainObj: any) => {
          if (/\*|\//g.test(domainObj.host)) {
            // if domain = regexp rule
            const pattern = new RegExp(domainObj.host)
            return pattern.test(url)
          } else {
            return domainObj.host === host
          }
        })
      )
      return foundAccount
    }
  }
  return false
}

export const getUrlFromArgv = (argv: any) => {
  const possibleUrl = [...argv].pop()
  const url = /http:\/\/|https:\/\//i.test(possibleUrl) ? possibleUrl : null
  return url
}
