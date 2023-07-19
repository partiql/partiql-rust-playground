"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("../constants");
var _RandomUID = _interopRequireDefault(require("../utils/RandomUID"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var prefixID = 'react-svg-pan-zoom_border_gradient';
function BorderGradient(_ref) {
  var direction = _ref.direction,
    width = _ref.width,
    height = _ref.height,
    _uid = _ref._uid;
  var transform;
  switch (direction) {
    case _constants.POSITION_TOP:
      transform = "translate(".concat(width, ", 0) rotate(90)");
      break;
    case _constants.POSITION_RIGHT:
      transform = "translate(".concat(width, ", ").concat(height, ") rotate(180)");
      break;
    case _constants.POSITION_BOTTOM:
      transform = "translate(0, ".concat(height, ") rotate(270)");
      break;
    case _constants.POSITION_LEFT:
    default:
      transform = " ";
      break;
  }
  var gradientID = "".concat(prefixID, "_gradient_").concat(_uid);
  var maskID = "".concat(prefixID, "_mask_").concat(_uid);
  return /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("linearGradient", {
    id: gradientID,
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "0%",
    spreadMethod: "pad"
  }, /*#__PURE__*/_react.default.createElement("stop", {
    offset: "0%",
    stopColor: "#fff",
    stopOpacity: "0.8"
  }), /*#__PURE__*/_react.default.createElement("stop", {
    offset: "100%",
    stopColor: "#000",
    stopOpacity: "0.5"
  })), /*#__PURE__*/_react.default.createElement("mask", {
    id: maskID,
    x: "0",
    y: "0",
    width: "20",
    height: Math.max(width, height)
  }, /*#__PURE__*/_react.default.createElement("rect", {
    x: "0",
    y: "0",
    width: "20",
    height: Math.max(width, height),
    style: {
      stroke: "none",
      fill: "url(#".concat(gradientID, ")")
    }
  }))), /*#__PURE__*/_react.default.createElement("rect", {
    x: "0",
    y: "0",
    width: "20",
    height: Math.max(width, height),
    style: {
      stroke: "none",
      fill: "#000",
      mask: "url(#".concat(maskID, ")")
    },
    transform: transform
  }));
}
BorderGradient.propTypes = {
  direction: _propTypes.default.oneOf([_constants.POSITION_TOP, _constants.POSITION_RIGHT, _constants.POSITION_BOTTOM, _constants.POSITION_LEFT]).isRequired,
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired
};
var _default = (0, _RandomUID.default)(BorderGradient);
exports.default = _default;