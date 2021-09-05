export const extractHostname = (url: any) => {
  let hostname
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2]
  } else {
    hostname = url.split('/')[0]
  }

  //find & remove port number
  // hostname = hostname.split(':')[0]
  //find & remove "?"
  hostname = hostname.split('?')[0]

  return hostname.replace('www.', '')
}

export const findDomainInViewer = (grid: any, url: any) => {
  if (url && grid.length && grid.some((account: any) => account.domains.length)) {
    const hostname = extractHostname(url)
    const foundAccount = grid.find((account: any) =>
      account.domains.some((domain: any) => {
        // if domain = regexp rule
        if (/\*|\//g.test(domain)) {
          const pattern = new RegExp(domain)
          return pattern.test(url)
        } else {
          return domain === hostname
        }
      })
    )
    return foundAccount
  } else {
    return false
  }
}
