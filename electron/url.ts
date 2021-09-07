import { exec } from 'child_process'

export const openUrl = ({ viewer, url }: any) => {
  const {
    browser: { exePath },
    account,
    incognito
  } = viewer
  let execCmd = `start "" "${exePath}"`
  if (account && account?.profileDirectoryPath)
    execCmd += ` --profile-directory="${[
      ...account?.profileDirectoryPath.split('\\')
    ].pop()}"`
  if (incognito) execCmd += ` -${incognito.name}`
  if (url) execCmd += ` "${url}"`
  exec(execCmd)
}

// export const openInFigma = ({ url }) => {
//   exec(`start ${url.replace(/^.+file/gi, 'figma://file')}`)
// }

// export const openInZoom = ({ url }) => {
//   try {
//     const zoomUrl = new URL(url)
//     const confno = zoomUrl.pathname.match(/j\/(\d+)/i)?.[1]
//     const pwd = zoomUrl.searchParams.get('pwd')

//     const execPath = `start zoommtg://zoom.us/join?confno=${confno}${
//       pwd ? `^&pwd=${pwd}` : ''
//     }`
//     log.info(execPath)
//     exec(execPath)
//   } catch (e) {
//     log.info(e)
//   }
// }
