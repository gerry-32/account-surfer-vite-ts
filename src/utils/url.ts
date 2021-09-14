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
    window.electronLog.error(e)
    return {}
  }
}
