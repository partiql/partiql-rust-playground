import React from 'react';
import PropTypes from 'prop-types';
import RandomUID from "../utils/RandomUID";
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
  return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("mask", {
    id: maskID
  }, /*#__PURE__*/React.createElement("rect", {
    x: SVGMinX,
    y: SVGMinY,
    width: SVGWidth,
    height: SVGHeight,
    fill: "#ffffff"
  }), /*#__PURE__*/React.createElement("rect", {
    x: x1,
    y: y1,
    width: x2 - x1,
    height: y2 - y1
  }))), /*#__PURE__*/React.createElement("rect", {
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
  SVGWidth: PropTypes.number.isRequired,
  SVGHeight: PropTypes.number.isRequired,
  SVGMinX: PropTypes.number.isRequired,
  SVGMinY: PropTypes.number.isRequired,
  x1: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  zoomToFit: PropTypes.number.isRequired
};
export default RandomUID(MiniatureMask);