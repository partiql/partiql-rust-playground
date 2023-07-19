function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import PropTypes from 'prop-types';
import { openMiniature, closeMiniature } from '../features/miniature';
import IconArrow from './icon-arrow';
import { POSITION_RIGHT, POSITION_LEFT } from '../constants';
export default function MiniatureToggleButton(_ref) {
  var _style;
  var value = _ref.value,
    onChangeValue = _ref.onChangeValue,
    position = _ref.position;
  var style = (_style = {
    width: "24px",
    height: "24px",
    display: "block",
    position: "absolute",
    bottom: 0
  }, _defineProperty(_style, position === POSITION_LEFT ? 'left' : 'right', '0px'), _defineProperty(_style, "background", "rgba(19, 20, 22, 0.901961)"), _defineProperty(_style, "border", 0), _defineProperty(_style, "padding", 0), _defineProperty(_style, "outline", 0), _defineProperty(_style, "color", "#fff"), _style);
  var action = value.miniatureOpen ? closeMiniature : openMiniature;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: style,
    onClick: function onClick() {
      return onChangeValue(action(value));
    }
  }, /*#__PURE__*/React.createElement(IconArrow, {
    open: value.miniatureOpen,
    position: position
  }));
}
MiniatureToggleButton.propTypes = {
  value: PropTypes.object.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  position: PropTypes.oneOf([POSITION_RIGHT, POSITION_LEFT]).isRequired
};