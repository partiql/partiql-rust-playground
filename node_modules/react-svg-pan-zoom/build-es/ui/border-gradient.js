import React from 'react';
import PropTypes from 'prop-types';
import { POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT } from '../constants';
import RandomUID from "../utils/RandomUID";
var prefixID = 'react-svg-pan-zoom_border_gradient';
function BorderGradient(_ref) {
  var direction = _ref.direction,
    width = _ref.width,
    height = _ref.height,
    _uid = _ref._uid;
  var transform;
  switch (direction) {
    case POSITION_TOP:
      transform = "translate(".concat(width, ", 0) rotate(90)");
      break;
    case POSITION_RIGHT:
      transform = "translate(".concat(width, ", ").concat(height, ") rotate(180)");
      break;
    case POSITION_BOTTOM:
      transform = "translate(0, ".concat(height, ") rotate(270)");
      break;
    case POSITION_LEFT:
    default:
      transform = " ";
      break;
  }
  var gradientID = "".concat(prefixID, "_gradient_").concat(_uid);
  var maskID = "".concat(prefixID, "_mask_").concat(_uid);
  return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gradientID,
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "0%",
    spreadMethod: "pad"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#fff",
    stopOpacity: "0.8"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#000",
    stopOpacity: "0.5"
  })), /*#__PURE__*/React.createElement("mask", {
    id: maskID,
    x: "0",
    y: "0",
    width: "20",
    height: Math.max(width, height)
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "0",
    width: "20",
    height: Math.max(width, height),
    style: {
      stroke: "none",
      fill: "url(#".concat(gradientID, ")")
    }
  }))), /*#__PURE__*/React.createElement("rect", {
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
  direction: PropTypes.oneOf([POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT]).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};
export default RandomUID(BorderGradient);