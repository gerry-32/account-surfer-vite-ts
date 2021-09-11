import { exec } from 'child_process'

export const openUrl = ({ viewer, url }: any) => {
  const { exePath, commandLineArguments } = viewer
  let execCmd = `start "" "${exePath}"`
  execCmd += ` ${commandLineArguments}`
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
