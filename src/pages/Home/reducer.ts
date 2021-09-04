import {
  squeezeGrid,
  squeezeLayout,
  getSqueezeRequired,
  getMissingIds,
  getGridWithInactive,
  orderGrid,
  orderLayout,
  mergeLayoutWithGridField
} from '../../utils/layout'

const reducer = (state, action) => {
  const cases = {
    UPDATE_LAYOUT: () => {
      const { igroreUpdateLayout, viewers } = state
      const { updatedLayout } = action

      const squeezeRequired = getSqueezeRequired(updatedLayout)
      if (igroreUpdateLayout && !squeezeRequired) {
        return {
          ...state,
          igroreUpdateLayout: false
        }
      } else {
        const orderedLayout = orderLayout(updatedLayout)
        const squeezedLayout = squeezeLayout(orderedLayout)
        const gridWithoutInactive = mergeLayoutWithGridField(squeezedLayout, viewers)
        const missingIds = getMissingIds(viewers, squeezedLayout)
        const gridWithInactive = getGridWithInactive(
          gridWithoutInactive,
          missingIds,
          viewers
        )
        const squeezedGrid = squeezeGrid(gridWithInactive)
        const orderedGrid = orderGrid(squeezedGrid)

        return {
          ...state,
          viewers: orderedGrid,
          igroreUpdateLayout: true
        }
      }
    }
  }

  return cases[action.type] ? cases[action.type]() : state
}

export default reducer
