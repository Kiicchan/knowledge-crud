import React from 'react'

export const stateReducer = (state, action) => ({
  ...state,
  ...(typeof action === 'function' ? action(state) : action),
})

const useObjectState = (initial, lazyInitializer = null) => {
  const [state, dispath] = React.useReducer(stateReducer, initial, (init) =>
    lazyInitializer ? lazyInitializer(init) : init
  )

  return [state, dispath]
}

export default useObjectState
