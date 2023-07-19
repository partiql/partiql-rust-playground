"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IconArrow;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//credits https://materialdesignicons.com/icon/chevron-up

function IconArrow(_ref) {
  var open = _ref.open,
    position = _ref.position;
  var transform = 0;
  switch (position) {
    case _constants.POSITION_LEFT:
      transform = open ? "rotate(225, 12, 13)" : "rotate(45, 12, 13)";
      break;
    case _constants.POSITION_RIGHT:
      transform = transform = open ? "rotate(135, 12, 13)" : "rotate(-45, 12, 13)";
      break;
    default:
    //no op
  }

  return /*#__PURE__*/_react.default.createElement("svg", {
    width: 24,
    height: 24,
    stroke: "currentColor"
  }, /*#__PURE__*/_react.default.createElement("g", {
    transform: transform
  }, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#000000",
    d: "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
  })));
}
IconArrow.propTypes = {
  open: _propTypes.default.bool.isRequired,
  position: _propTypes.default.oneOf([_constants.POSITION_RIGHT, _constants.POSITION_LEFT]).isRequired
};