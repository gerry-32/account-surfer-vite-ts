import React from 'react'
import Header from './Header'
import Grid from './Grid'
import Footer from './Footer'
import useKeyPress from '../../utils/useKeyPress'
import { extractHostname } from '../../utils/url'

const GRID_HEIGHT = 270
const SAVE_DOMAIN_PANEL_HEIGHT = 28

const Home = ({ state, storeState }: any) => {
  const { url, grid, showHidden, shouldSaveDomain } = state

  useKeyPress(
    ({ code }: any) => code === 'KeyA',
    () => {
      if (!showHidden) storeState({ dragEnabled: false })
      storeState({ showHidden: !showHidden })
    }
  )

  const openUrlInViewer = (viewer: any, ctrlEnabled: boolean) => {
    if (shouldSaveDomain || ctrlEnabled) {
      storeState({
        shouldSaveDomain: false,
        grid: grid.map((v: any) =>
          v.id === viewer.id ? { ...v, domains: [...v.domains, extractHostname(url)] } : v
        )
      })
    }
    window.invokeEvent('openUrl', viewer)
  }

  return (
    <div className="h-[400px]">
      <Header {...{ state }} />
      <div
        className="overflow-y-auto overflow-x-hidden pb-5"
        style={{ height: url ? GRID_HEIGHT - SAVE_DOMAIN_PANEL_HEIGHT : GRID_HEIGHT }}
      >
        <Grid {...{ openUrlInViewer, state, storeState }} />
      </div>
      {url && (
        <div
          className="relative flex items-start px-8 pt-2 pb-0 text-gray-300"
          style={{
            height: SAVE_DOMAIN_PANEL_HEIGHT,
            boxShadow: url ? '#1c2531 -12px -5px 5px 0px' : ''
          }}
        >
          <div className="flex items-center h-5">
            <input
              id="saveDomain"
              name="saveDomain"
              type="checkbox"
              checked={shouldSaveDomain}
              className="form-checkbox"
              onChange={e => storeState({ shouldSaveDomain: e.target.checked })}
            />
          </div>
          <div className="ml-2 text-sm">
            <label htmlFor="saveDomain" className="">
              Always open current domain with selected Account / Browser
            </label>
          </div>
        </div>
      )}
      <div
        className="relative z-50"
        style={{ boxShadow: url ? '' : '#1c2531 -12px -5px 10px 0px' }}
      >
        <Footer {...{ state, storeState }} />
      </div>
    </div>
  )
}

export default Home
