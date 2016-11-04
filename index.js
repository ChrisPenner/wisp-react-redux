'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wisps = exports.wispReducer = exports.wisp = exports.errorWisp = exports.successWisp = exports.wispMaker = exports.hideWisp = exports.createWisp = exports.HIDE_WISP = exports.CREATE_WISP = undefined;

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CREATE_WISP = exports.CREATE_WISP = '@wisp/CREATE_WISP';
var HIDE_WISP = exports.HIDE_WISP = '@wisp/HIDE_WISP';

var id = 1;

var createWisp = exports.createWisp = function createWisp(payload) {
  return {
    type: CREATE_WISP,
    payload: payload
  };
};

var hideWisp = exports.hideWisp = function hideWisp(payload) {
  return {
    type: HIDE_WISP,
    payload: payload
  };
};

var wispMaker = exports.wispMaker = function wispMaker(options) {
  return function (_ref) {
    var title = _ref.title,
        message = _ref.message,
        customClass = _ref.customClass;
    return function (dispatch) {
      var key = String(id++);
      var newWisp = createWisp(Object.assign(options, {
        id: key,
        title: title,
        message: message,
        customClass: customClass
      }));
      dispatch(newWisp);
      setTimeout(function () {
        return dispatch(hideWisp({ id: key }));
      }, 3000);
    };
  };
};

var successWisp = exports.successWisp = wispMaker({ wispClass: 'success' });
var errorWisp = exports.errorWisp = wispMaker({ wispClass: 'error' });
var wisp = exports.wisp = wispMaker({});

var DEFAULT_STATE = {};

var wispReducer = exports.wispReducer = function wispReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments[1];
  var payload = action.payload;

  switch (action.type) {
    case CREATE_WISP:
      return Object.assign({}, state, _defineProperty({}, payload.id, payload));
    case HIDE_WISP:
      var newState = Object.assign({}, state);
      delete newState[payload.id];
      return newState;
    default:
      return state;
  }
};

var stateToProps = function stateToProps(_ref2) {
  var wisps = _ref2.wisps;
  return { wisps: wisps };
};

// const wispStyle = {
//   'position': 'fixed',
//   'top': '1em',
//   'right': '1em',
//   'width': 'auto',
//   'zIndex': '999',
//   'transition': 'all 1s ease-in',
// }

var wispStyle = '\n\n.wisp.success {\n    background-color: #97cd76;\n    color: white;\n}\n\n.wisp.error {\n    background-color: #ed6c63;\n    color: white;\n}\n\n.wisp {\n    background-color: #00d1b2;\n    border-radius: 3px;\n    padding: 16px 20px;\n    position: relative;\n    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;\n}\n\n.wisp-title {\n    color: inherit;\n    font-size: 18px;\n    line-height: 1.125;\n    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;\n}\n\n.wisp-message {\n    color: inherit;\n    font-size: 16px;\n    line-height: 1;\n    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;\n}\n\n.wisps {\n  position: fixed;\n  top: 1em;\n  right: 1em;\n  width: auto;\n  z-index: 999;\n  transition: all 1s ease-in\n}\n\n.wisp-enter {\n  opacity: 0.01;\n}\n\n.wisp-enter.wisp-enter-active {\n  opacity: 1;\n  transition: opacity 200ms ease-in;\n}\n\n.wisp-leave {\n  opacity: 1;\n}\n\n.wisp-leave.wisp-leave-active {\n  opacity: 0.01;\n  transition: opacity 400ms ease-in;\n}\n';

var Wisps = exports.Wisps = (0, _reactRedux.connect)(stateToProps)(function (_ref3) {
  var wisps = _ref3.wisps;

  var allWisps = Object.values(wisps).map(function (_ref4) {
    var title = _ref4.title,
        message = _ref4.message,
        id = _ref4.id,
        _ref4$wispClass = _ref4.wispClass,
        wispClass = _ref4$wispClass === undefined ? '' : _ref4$wispClass,
        _ref4$customClass = _ref4.customClass,
        customClass = _ref4$customClass === undefined ? '' : _ref4$customClass;
    return _react2.default.createElement(
      'div',
      { key: id, className: 'wisp ' + wispClass + ' ' + customClass },
      title && _react2.default.createElement(
        'h1',
        { className: 'wisp-title' },
        title
      ),
      message && _react2.default.createElement(
        'h2',
        { className: 'wisp-message' },
        message
      )
    );
  });
  return _react2.default.createElement(
    _reactAddonsCssTransitionGroup2.default,
    { className: 'wisps', transitionName: 'wisp', transitionEnterTimeout: 200, transitionLeaveTimeout: 400 },
    _react2.default.createElement(
      'style',
      null,
      wispStyle
    ),
    allWisps
  );
});

