/* @flow */
import Animate from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import React from 'react'
export const CREATE_WISP = '@wisp/CREATE_WISP'
export const HIDE_WISP = '@wisp/HIDE_WISP'

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

export const createWisp = (payload: optionsT): action => ({
  type: CREATE_WISP,
  payload,
})

export const hideWisp = (payload: optionsT): action => ({
  type: HIDE_WISP,
  payload,
})

export const wispMaker = (options: Object) => ({title, message, customClass}) => (dispatch: Function) => {
  const key = String(id++)
  const newWisp = createWisp(Object.assign(options, {
    id: key,
    title,
    message,
    customClass,
  }));
  dispatch(newWisp);
  setTimeout(() => dispatch(hideWisp({ id: key, })), 3000)
}

export const successWisp = wispMaker({wispClass: 'success'})
export const errorWisp = wispMaker({wispClass: 'error'})
export const wisp = wispMaker({})

export type WispState = {[id: string]: optionsT}
const DEFAULT_STATE:WispState = {}

export const wispReducer: (state: optionsT, action: Object) => optionsT = (state=DEFAULT_STATE, action) => {
  const {payload} = action
  switch (action.type) {
  case CREATE_WISP:
    return Object.assign({}, state, {
      [payload.id]: payload,
    })
  case HIDE_WISP:
    const newState = Object.assign({}, state)
    delete newState[payload.id]
    return newState
  default:
    return state
  }
}

const stateToProps = ({wisps}) => ({wisps})

// const wispStyle = {
//   'position': 'fixed',
//   'top': '1em',
//   'right': '1em',
//   'width': 'auto',
//   'zIndex': '999',
//   'transition': 'all 1s ease-in',
// }

const wispStyle = `

.wisp.success {
    background-color: #97cd76;
    color: white;
}

.wisp.error {
    background-color: #ed6c63;
    color: white;
}

.wisp {
    background-color: #00d1b2;
    border-radius: 3px;
    padding: 16px 20px;
    position: relative;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}

.wisp-title {
    color: inherit;
    font-size: 18px;
    line-height: 1.125;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}

.wisp-message {
    color: inherit;
    font-size: 16px;
    line-height: 1;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}

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

export const Wisps = connect(stateToProps)(({wisps}) => {
  const allWisps = Object.values(wisps).map((({title, message, id, wispClass='', customClass=''}) => (
    <div key={id} className={`wisp ${wispClass} ${customClass}`}>
      {title && <h1 className="wisp-title">{title}</h1>}
      {message && <h2 className="wisp-message">{message}</h2>}
    </div>
  )))
  return (
    <Animate className="wisps" transitionName="wisp" transitionEnterTimeout={200} transitionLeaveTimeout={400}>
      <style>
        {wispStyle}
      </style>
      {allWisps}
    </Animate>
  )})
