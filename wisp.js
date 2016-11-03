/* @flow */
import Animate from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
export const CREATE_TOAST = 'CREATE_TOAST'
export const HIDE_TOAST = 'HIDE_TOAST'

let id = 1

type optionsT = {
  id: string,
  title: ?string,
  message: ?string,
}

type action = {
  type: string,
  payload: Object,
}

export const createToast = (payload: optionsT): action => ({
  type: CREATE_TOAST,
  payload,
})

export const hideToast = (payload: optionsT): action => ({
  type: HIDE_TOAST,
  payload,
})

export const toast = (options: Object) => (title: string, message: ?string) => (dispatch: Function) => {
  const key = String(id++)
  const newToast = createToast(Object.assign({
    id: key,
    title,
    message,
  }, options));
  dispatch(newToast);
  setTimeout(() => dispatch(hideToast({ id: key, })), 3000)
}

export const successToast = toast({type: 'success'})
export const errorToast = toast({type: 'error'})

export type WispState = {[id: string]: optionsT}
const DEFAULT_STATE:WispState = {}

export const wispReducer: (state: optionsT, action: Object) => optionsT = (state=DEFAULT_STATE, action) => {
  const {payload} = action
  switch (action.type) {
  case CREATE_TOAST:
    return Object.assign({}, state, {
      [payload.id]: payload,
    })
  case HIDE_TOAST:
    const newState = Object.assign({}, state)
    delete newState[payload.id]
    return newState
  default:
    return state
  }
}

const statusToClass = {
  'success': 'is-success',
  'error': 'is-danger',
}

const stateToProps = ({toasts}) => ({toasts})

// const toastStyle = {
//   'position': 'fixed',
//   'top': '1em',
//   'right': '1em',
//   'width': 'auto',
//   'zIndex': '999',
//   'transition': 'all 1s ease-in',
// }

const toastStyle = `
.wisps {
  position: fixed;
  top: 1em;
  right: 1em;
  width: auto;
  z-index: 999;
  transition: all 1s ease-in
}

.wisp-enter {
  opacity: 0.01;
}

.wisp-enter.wisp-enter-active {
  opacity: 1;
  transition: opacity 200ms ease-in;
}

.wisp-leave {
  opacity: 1;
}

.wisp-leave.wisp-leave-active {
  opacity: 0.01;
  transition: opacity 400ms ease-in;
}
`

export const Toasts = connect(stateToProps)(({toasts, customClass}) => {
  const allToasts = Object.values(toasts).map((({title, message, id, type}) => (
    <div  key={id} className={`notification ${statusToClass[type]} ${customClass || ''}`}>
      {title && <h1 className="subtitle">{title}</h1>}
      {message && <h2 className="subtitle">{message}</h2>}
    </div>
  )))
  return (
    <Animate className="wisps" transitionName="wisp" transitionEnterTimeout={200} transitionLeaveTimeout={400}>
      <style>
        {toastStyle}
      </style>
      {allToasts}
    </Animate>
  )})
