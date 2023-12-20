import React from 'react'
import { Provider } from 'react-redux'
import store from 'src/redux/Store'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'

export const shallowWithMock = (
  Component,
  initialStoreState,
  initialProps = {},
) => {
  React.useLayoutEffect = React.useEffect
  let mockStore = configureStore()
  mockStore = mockStore(initialStoreState)
  return shallow(
    <Provider store={initialStoreState ? mockStore : store}>
      <Component {...initialProps} />
    </Provider>,
  )
}

export const mountWithMock = (
  Component,
  initialStoreState,
  initialProps = {},
) => {
  React.useLayoutEffect = React.useEffect
  let mockStore = configureStore()
  mockStore = mockStore(initialStoreState)
  return mount(
    <Provider store={initialStoreState ? mockStore : store}>
      <Component {...initialProps} />
    </Provider>,
  )
}
export const mountWithRouterMock = (
  Component,
  initialStoreState,
  initialProps = {},
) => {
  React.useLayoutEffect = React.useEffect
  let mockStore = configureStore()
  mockStore = mockStore(initialStoreState)
  return mount(
    <Provider store={initialStoreState ? mockStore : store}>
      <Component {...initialProps} />
    </Provider>,
  )
}
