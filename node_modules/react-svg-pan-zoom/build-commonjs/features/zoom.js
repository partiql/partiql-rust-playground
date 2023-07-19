"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fitSelection = fitSelection;
exports.fitToViewer = fitToViewer;
exports.isZoomLevelGoingOutOfBounds = isZoomLevelGoingOutOfBounds;
exports.limitZoomLevel = limitZoomLevel;
exports.startZooming = startZooming;
exports.stopZooming = stopZooming;
exports.updateZooming = updateZooming;
exports.zoom = zoom;
exports.zoomOnViewerCenter = zoomOnViewerCenter;
var _transformationMatrix = require("transformation-matrix");
var _constants = require("../constants");
var _common = require("./common");
var _calculateBox = _interopRequireDefault(require("../utils/calculateBox"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function isZoomLevelGoingOutOfBounds(value, scaleFactor) {
  var _decompose = (0, _common.decompose)(value),
    curScaleFactor = _decompose.scaleFactor;
  var lessThanScaleFactorMin = value.scaleFactorMin && curScaleFactor * scaleFactor < value.scaleFactorMin;
  var moreThanScaleFactorMax = value.scaleFactorMax && curScaleFactor * scaleFactor > value.scaleFactorMax;
  return lessThanScaleFactorMin && scaleFactor < 1 || moreThanScaleFactorMax && scaleFactor > 1;
}
function limitZoomLevel(value, matrix) {
  var scaleLevel = matrix.a;
  if (value.scaleFactorMin != null) {
    // limit minimum zoom
    scaleLevel = Math.max(scaleLevel, value.scaleFactorMin);
  }
  if (value.scaleFactorMax != null) {
    // limit maximum zoom
    scaleLevel = Math.min(scaleLevel, value.scaleFactorMax);
  }
  return (0, _common.set)(matrix, {
    a: scaleLevel,
    d: scaleLevel
  });
}
function zoom(value, SVGPointX, SVGPointY, scaleFactor) {
  if (isZoomLevelGoingOutOfBounds(value, scaleFactor)) {
    // Do not change translation and scale of value
    return value;
  }
  var matrix = (0, _transformationMatrix.transform)((0, _transformationMatrix.fromObject)(value), (0, _transformationMatrix.translate)(SVGPointX, SVGPointY), (0, _transformationMatrix.scale)(scaleFactor, scaleFactor), (0, _transformationMatrix.translate)(-SVGPointX, -SVGPointY));
  return (0, _common.set)(value, _objectSpread(_objectSpread({
    mode: _constants.MODE_IDLE
  }, matrix), {}, {
    startX: null,
    startY: null,
    endX: null,
    endY: null
  }), _constants.ACTION_ZOOM);
}

//ENHANCEMENT: add ability to control alignment
//ENHANCEMENT: add ability to selectively fit image inside viewer
//ENHANCEMENT: refactor some logic in order to merge with fitToViewer function
function fitSelection(value, selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
  var viewerWidth = value.viewerWidth,
    viewerHeight = value.viewerHeight;
  var scaleX = viewerWidth / selectionWidth;
  var scaleY = viewerHeight / selectionHeight;
  var scaleLevel = Math.min(scaleX, scaleY);
  var matrix = (0, _transformationMatrix.transform)((0, _transformationMatrix.scale)(scaleLevel, scaleLevel),
  //2
  (0, _transformationMatrix.translate)(-selectionSVGPointX, -selectionSVGPointY) //1
  );

  if (isZoomLevelGoingOutOfBounds(value, scaleLevel / value.d)) {
    // Do not allow scale and translation
    return (0, _common.set)(value, {
      mode: _constants.MODE_IDLE,
      startX: null,
      startY: null,
      endX: null,
      endY: null
    });
  }
  return (0, _common.set)(value, _objectSpread(_objectSpread({
    mode: _constants.MODE_IDLE
  }, limitZoomLevel(value, matrix)), {}, {
    startX: null,
    startY: null,
    endX: null,
    endY: null
  }), _constants.ACTION_ZOOM);
}
function fitToViewer(value) {
  var SVGAlignX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.ALIGN_LEFT;
  var SVGAlignY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.ALIGN_TOP;
  var viewerWidth = value.viewerWidth,
    viewerHeight = value.viewerHeight,
    SVGMinX = value.SVGMinX,
    SVGMinY = value.SVGMinY,
    SVGWidth = value.SVGWidth,
    SVGHeight = value.SVGHeight;
  var scaleX = viewerWidth / SVGWidth;
  var scaleY = viewerHeight / SVGHeight;
  var scaleLevel = Math.min(scaleX, scaleY);
  var scaleMatrix = (0, _transformationMatrix.scale)(scaleLevel, scaleLevel);
  var translateX = -SVGMinX * scaleX;
  var translateY = -SVGMinY * scaleY;

  // after fitting, SVG and the viewer will match in width (1) or in height (2) or SVG will cover the container with preserving aspect ratio (0)
  if (scaleX < scaleY) {
    var remainderY = viewerHeight - scaleX * SVGHeight;

    //(1) match in width, meaning scaled SVGHeight <= viewerHeight
    switch (SVGAlignY) {
      case _constants.ALIGN_TOP:
        translateY = -SVGMinY * scaleLevel;
        break;
      case _constants.ALIGN_CENTER:
        translateY = Math.round(remainderY / 2) - SVGMinY * scaleLevel;
        break;
      case _constants.ALIGN_BOTTOM:
        translateY = remainderY - SVGMinY * scaleLevel;
        break;
      case _constants.ALIGN_COVER:
        scaleMatrix = (0, _transformationMatrix.scale)(scaleY, scaleY); // (0) we must now match to short edge, in this case - height
        var remainderX = viewerWidth - scaleY * SVGWidth; // calculate remainder in the other scale

        translateX = SVGMinX + Math.round(remainderX / 2); // center by the long edge
        break;
      default:
      //no op
    }
  } else {
    var _remainderX = viewerWidth - scaleY * SVGWidth;

    //(2) match in height, meaning scaled SVGWidth <= viewerWidth
    switch (SVGAlignX) {
      case _constants.ALIGN_LEFT:
        translateX = -SVGMinX * scaleLevel;
        break;
      case _constants.ALIGN_CENTER:
        translateX = Math.round(_remainderX / 2) - SVGMinX * scaleLevel;
        break;
      case _constants.ALIGN_RIGHT:
        translateX = _remainderX - SVGMinX * scaleLevel;
        break;
      case _constants.ALIGN_COVER:
        scaleMatrix = (0, _transformationMatrix.scale)(scaleX, scaleX); // (0) we must now match to short edge, in this case - width
        var _remainderY = viewerHeight - scaleX * SVGHeight; // calculate remainder in the other scale

        translateY = SVGMinY + Math.round(_remainderY / 2); // center by the long edge
        break;
      default:
      //no op
    }
  }

  var translationMatrix = (0, _transformationMatrix.translate)(translateX, translateY);
  var matrix = (0, _transformationMatrix.transform)(translationMatrix,
  //2
  scaleMatrix //1
  );

  if (isZoomLevelGoingOutOfBounds(value, scaleLevel / value.d)) {
    // Do not allow scale and translation
    return (0, _common.set)(value, {
      mode: _constants.MODE_IDLE,
      startX: null,
      startY: null,
      endX: null,
      endY: null
    });
  }
  return (0, _common.set)(value, _objectSpread(_objectSpread({
    mode: _constants.MODE_IDLE
  }, limitZoomLevel(value, matrix)), {}, {
    startX: null,
    startY: null,
    endX: null,
    endY: null
  }), _constants.ACTION_ZOOM);
}
function zoomOnViewerCenter(value, scaleFactor) {
  var viewerWidth = value.viewerWidth,
    viewerHeight = value.viewerHeight;
  var SVGPoint = (0, _common.getSVGPoint)(value, viewerWidth / 2, viewerHeight / 2);
  return zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);
}
function startZooming(value, viewerX, viewerY) {
  return (0, _common.set)(value, {
    mode: _constants.MODE_ZOOMING,
    startX: viewerX,
    startY: viewerY,
    endX: viewerX,
    endY: viewerY
  });
}
function updateZooming(value, viewerX, viewerY) {
  if (value.mode !== _constants.MODE_ZOOMING) throw new Error('update selection not allowed in this mode ' + value.mode);
  return (0, _common.set)(value, {
    endX: viewerX,
    endY: viewerY
  });
}
function stopZooming(value, viewerX, viewerY, scaleFactor) {
  var TOLERATED_DISTANCE = 7; //minimum distance to choose if area selection or drill down on point
  var startX = value.startX,
    startY = value.startY;
  var start = (0, _common.getSVGPoint)(value, startX, startY);
  var end = (0, _common.getSVGPoint)(value, viewerX, viewerY);
  if (Math.abs(startX - viewerX) > TOLERATED_DISTANCE && Math.abs(startY - viewerY) > TOLERATED_DISTANCE) {
    var box = (0, _calculateBox.default)(start, end);
    return fitSelection(value, box.x, box.y, box.width, box.height);
  } else {
    var SVGPoint = (0, _common.getSVGPoint)(value, viewerX, viewerY);
    return zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);
  }
}