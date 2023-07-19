"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _RandomUID = _interopRequireDefault(require("../utils/RandomUID"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var prefixID = 'react-svg-pan-zoom_miniature';
function MiniatureMask(_ref) {
  var SVGMinX = _ref.SVGMinX,
    SVGMinY = _ref.SVGMinY,
    SVGWidth = _ref.SVGWidth,
    SVGHeight = _ref.SVGHeight,
    x1 = _ref.x1,
    y1 = _ref.y1,
    x2 = _ref.x2,
    y2 = _ref.y2,
    zoomToFit = _ref.zoomToFit,
    _uid = _ref._uid;
  var maskID = "".concat(prefixID, "_mask_").concat(_uid);
  return /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("mask", {
    id: maskID
  }, /*#__PURE__*/_react.default.createElement("rect", {
    x: SVGMinX,
    y: SVGMinY,
    width: SVGWidth,
    height: SVGHeight,
    fill: "#ffffff"
  }), /*#__PURE__*/_react.default.createElement("rect", {
    x: x1,
    y: y1,
    width: x2 - x1,
    height: y2 - y1
  }))), /*#__PURE__*/_react.default.createElement("rect", {
    x: SVGMinX,
    y: SVGMinY,
    width: SVGWidth,
    height: SVGHeight,
    style: {
      stroke: "none",
      fill: "#000",
      mask: "url(#".concat(maskID, ")"),
      opacity: 0.4
    }
  }));
}
MiniatureMask.propTypes = {
  SVGWidth: _propTypes.default.number.isRequired,
  SVGHeight: _propTypes.default.number.isRequired,
  SVGMinX: _propTypes.default.number.isRequired,
  SVGMinY: _propTypes.default.number.isRequired,
  x1: _propTypes.default.number.isRequired,
  y1: _propTypes.default.number.isRequired,
  x2: _propTypes.default.number.isRequired,
  y2: _propTypes.default.number.isRequired,
  zoomToFit: _propTypes.default.number.isRequired
};
var _default = (0, _RandomUID.default)(MiniatureMask);
exports.default = _default;