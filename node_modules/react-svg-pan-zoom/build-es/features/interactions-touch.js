function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { transform, fromObject, translate, scale } from 'transformation-matrix';
import { TOOL_PAN, TOOL_AUTO, TOOL_ZOOM_IN, TOOL_ZOOM_OUT, MODE_IDLE, MODE_PANNING, MODE_ZOOMING } from '../constants';
import { resetMode, getSVGPoint, set } from './common';
import { onMouseDown, onMouseMove, onMouseUp } from './interactions';
import { isZoomLevelGoingOutOfBounds, limitZoomLevel } from './zoom';
function getTouchPosition(touch, ViewerDOM) {
  var _ViewerDOM$getBoundin = ViewerDOM.getBoundingClientRect(),
    left = _ViewerDOM$getBoundin.left,
    top = _ViewerDOM$getBoundin.top;
  var x = touch.clientX - Math.round(left);
  var y = touch.clientY - Math.round(top);
  return {
    x: x,
    y: y
  };
}
export function onTouchStart(event, ViewerDOM, tool, value, props) {
  if (isMultiTouch(event, props)) {
    return onMultiTouch(event, ViewerDOM, tool, value, props);
  }
  if (event.touches.length !== 1) {
    if ([MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0) {
      return resetMode(value);
    } else if ([MODE_IDLE].indexOf(value.mode) >= 0) {
      return value;
    }
  }
  return onSingleTouch(event, ViewerDOM, tool, value, props, onMouseDown);
}
export function onTouchMove(event, ViewerDOM, tool, value, props) {
  if (isMultiTouch(event, props)) {
    return onMultiTouch(event, ViewerDOM, tool, value, props);
  }
  if (!([MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0)) {
    return value;
  }
  return onSingleTouch(event, ViewerDOM, tool, value, props, onMouseMove);
}
export function onTouchEnd(event, ViewerDOM, tool, value, props) {
  if (!([MODE_PANNING, MODE_ZOOMING].indexOf(value.mode) >= 0)) {
    return value;
  }
  var nextValue = shouldResetPinchPointDistance(event, value, props) ? set(value, {
    pinchPointDistance: null
  }) : value;
  if (event.touches.length > 0) {
    return nextValue;
  }
  return onSingleTouch(event, ViewerDOM, tool, nextValue, props, onMouseUp);
}
export function onTouchCancel(event, ViewerDOM, tool, value, props) {
  event.stopPropagation();
  event.preventDefault();
  return resetMode(value);
}
function hasPinchPointDistance(value) {
  return typeof value.pinchPointDistance === 'number';
}
function shouldResetPinchPointDistance(event, value, props) {
  return props.detectPinchGesture && hasPinchPointDistance(value) && event.touches.length < 2;
}
function isMultiTouch(event, props) {
  return props.detectPinchGesture && event.touches.length > 1;
}
function onSingleTouch(event, ViewerDOM, tool, value, props, nextValueFn) {
  var nextValue = event.touches.length === 0 ? set(value, {
    mode: value.prePinchMode ? MODE_IDLE : value.mode,
    prePinchMode: null
  }) : value;
  var touch = event.touches.length > 0 ? event.touches[0] : event.changedTouches[0];
  var touchPosition = getTouchPosition(touch, ViewerDOM);
  switch (tool) {
    case TOOL_ZOOM_OUT:
    case TOOL_ZOOM_IN:
    case TOOL_AUTO:
    case TOOL_PAN:
      event.stopPropagation();
      event.preventDefault();
      return nextValueFn(event, ViewerDOM, tool, nextValue, props, touchPosition);
    default:
      return nextValue;
  }
}
function onMultiTouch(event, ViewerDOM, tool, value, props) {
  var _ViewerDOM$getBoundin2 = ViewerDOM.getBoundingClientRect(),
    left = _ViewerDOM$getBoundin2.left,
    top = _ViewerDOM$getBoundin2.top;
  var x1 = event.touches[0].clientX - Math.round(left);
  var y1 = event.touches[0].clientY - Math.round(top);
  var x2 = event.touches[1].clientX - Math.round(left);
  var y2 = event.touches[1].clientY - Math.round(top);
  var pinchPointDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  var previousPointDistance = hasPinchPointDistance(value) ? value.pinchPointDistance : pinchPointDistance;
  var svgPoint = getSVGPoint(value, (x1 + x2) / 2, (y1 + y2) / 2);
  var distanceFactor = pinchPointDistance / previousPointDistance;
  if (isZoomLevelGoingOutOfBounds(value, distanceFactor)) {
    // Do not change translation and scale of value
    return value;
  }
  if (event.cancelable) {
    event.preventDefault();
  }
  var matrix = transform(fromObject(value), translate(svgPoint.x, svgPoint.y), scale(distanceFactor, distanceFactor), translate(-svgPoint.x, -svgPoint.y));
  return set(value, set(_objectSpread(_objectSpread({
    mode: MODE_ZOOMING
  }, limitZoomLevel(value, matrix)), {}, {
    startX: null,
    startY: null,
    endX: null,
    endY: null,
    prePinchMode: value.prePinchMode ? value.prePinchMode : value.mode,
    pinchPointDistance: pinchPointDistance
  })));
}