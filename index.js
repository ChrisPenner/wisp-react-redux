'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toasts = exports.wispReducer = exports.errorToast = exports.successToast = exports.toast = exports.hideToast = exports.createToast = exports.HIDE_TOAST = exports.CREATE_TOAST = undefined;

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CREATE_TOAST = exports.CREATE_TOAST = 'CREATE_TOAST';
var HIDE_TOAST = exports.HIDE_TOAST = 'HIDE_TOAST';

var id = 1;

var createToast = exports.createToast = function createToast(payload) {
  return {
    type: CREATE_TOAST,
    payload: payload
  };
};

var hideToast = exports.hideToast = function hideToast(payload) {
  return {
    type: HIDE_TOAST,
    payload: payload
  };
};

var toast = exports.toast = function toast(options) {
  return function (title, message) {
    return function (dispatch) {
      var key = String(id++);
      var newToast = createToast(Object.assign({
        id: key,
        title: title,
        message: message
      }, options));
      dispatch(newToast);
      setTimeout(function () {
        return dispatch(hideToast({ id: key }));
      }, 3000);
    };
  };
};

var successToast = exports.successToast = toast({ type: 'success' });
var errorToast = exports.errorToast = toast({ type: 'error' });

var DEFAULT_STATE = {};

var wispReducer = exports.wispReducer = function wispReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments[1];
  var payload = action.payload;

  switch (action.type) {
    case CREATE_TOAST:
      return Object.assign({}, state, _defineProperty({}, payload.id, payload));
    case HIDE_TOAST:
      var newState = Object.assign({}, state);
      delete newState[payload.id];
      return newState;
    default:
      return state;
  }
};

var statusToClass = {
  'success': 'is-success',
  'error': 'is-danger'
};

var stateToProps = function stateToProps(_ref) {
  var toasts = _ref.toasts;
  return { toasts: toasts };
};

// const toastStyle = {
//   'position': 'fixed',
//   'top': '1em',
//   'right': '1em',
//   'width': 'auto',
//   'zIndex': '999',
//   'transition': 'all 1s ease-in',
// }

var toastStyle = '\n.wisps {\n  position: fixed;\n  top: 1em;\n  right: 1em;\n  width: auto;\n  z-index: 999;\n  transition: all 1s ease-in\n}\n\n.wisp-enter {\n  opacity: 0.01;\n}\n\n.wisp-enter.wisp-enter-active {\n  opacity: 1;\n  transition: opacity 200ms ease-in;\n}\n\n.wisp-leave {\n  opacity: 1;\n}\n\n.wisp-leave.wisp-leave-active {\n  opacity: 0.01;\n  transition: opacity 400ms ease-in;\n}\n';

var Toasts = exports.Toasts = (0, _reactRedux.connect)(stateToProps)(function (_ref2) {
  var toasts = _ref2.toasts,
      customClass = _ref2.customClass;

  var allToasts = Object.values(toasts).map(function (_ref3) {
    var title = _ref3.title,
        message = _ref3.message,
        id = _ref3.id,
        type = _ref3.type;
    return React.createElement(
      'div',
      { key: id, className: 'notification ' + statusToClass[type] + ' ' + (customClass || '') },
      title && React.createElement(
        'h1',
        { className: 'subtitle' },
        title
      ),
      message && React.createElement(
        'h2',
        { className: 'subtitle' },
        message
      )
    );
  });
  return React.createElement(
    _reactAddonsCssTransitionGroup2.default,
    { className: 'wisps', transitionName: 'wisp', transitionEnterTimeout: 200, transitionLeaveTimeout: 400 },
    React.createElement(
      'style',
      null,
      toastStyle
    ),
    allToasts
  );
});

