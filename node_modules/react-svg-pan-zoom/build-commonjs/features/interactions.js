"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMousePosition = getMousePosition;
exports.onDoubleClick = onDoubleClick;
exports.onInterval = onInterval;
exports.onMouseDown = onMouseDown;
exports.onMouseEnterOrLeave = onMouseEnterOrLeave;
exports.onMouseMove = onMouseMove;
exports.onMouseUp = onMouseUp;
exports.onWheel = onWheel;
var _constants = require("../constants");
var _common = require("./common");
var _pan = require("./pan");
var _zoom = require("./zoom");
var _mapRange = _interopRequireDefault(require("../utils/mapRange"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getMousePosition(event, ViewerDOM) {
  var _ViewerDOM$getBoundin = ViewerDOM.getBoundingClientRect(),
    left = _ViewerDOM$getBoundin.left,
    top = _ViewerDOM$getBoundin.top;
  var x = event.clientX - Math.round(left);
  var y = event.clientY - Math.round(top);
  return {
    x: x,
    y: y
  };
}
function onMouseDown(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var _ref = coords || getMousePosition(event, ViewerDOM),
    x = _ref.x,
    y = _ref.y;
  var nextValue = value;
  switch (tool) {
    case _constants.TOOL_ZOOM_OUT:
      var SVGPoint = (0, _common.getSVGPoint)(value, x, y);
      nextValue = (0, _zoom.zoom)(value, SVGPoint.x, SVGPoint.y, 1 / props.scaleFactor, props);
      break;
    case _constants.TOOL_ZOOM_IN:
      nextValue = (0, _zoom.startZooming)(value, x, y);
      break;
    case _constants.TOOL_AUTO:
    case _constants.TOOL_PAN:
      nextValue = (0, _pan.startPanning)(value, x, y);
      break;
    default:
      return value;
  }
  event.preventDefault();
  return nextValue;
}
function onMouseMove(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var _ref2 = coords || getMousePosition(event, ViewerDOM),
    x = _ref2.x,
    y = _ref2.y;
  var forceExit = event.buttons === 0; //the mouse exited and reentered into svg
  var nextValue = value;
  switch (tool) {
    case _constants.TOOL_ZOOM_IN:
      if (value.mode === _constants.MODE_ZOOMING) nextValue = forceExit ? (0, _zoom.stopZooming)(value, x, y, props.scaleFactor, props) : (0, _zoom.updateZooming)(value, x, y);
      break;
    case _constants.TOOL_AUTO:
    case _constants.TOOL_PAN:
      if (value.mode === _constants.MODE_PANNING) nextValue = forceExit ? (0, _pan.stopPanning)(value) : (0, _pan.updatePanning)(value, x, y, props.preventPanOutside ? 20 : undefined);
      break;
    default:
      return value;
  }
  event.preventDefault();
  return nextValue;
}
function onMouseUp(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var _ref3 = coords || getMousePosition(event, ViewerDOM),
    x = _ref3.x,
    y = _ref3.y;
  var nextValue = value;
  switch (tool) {
    case _constants.TOOL_ZOOM_OUT:
      if (value.mode === _constants.MODE_ZOOMING) nextValue = (0, _zoom.stopZooming)(value, x, y, 1 / props.scaleFactor, props);
      break;
    case _constants.TOOL_ZOOM_IN:
      if (value.mode === _constants.MODE_ZOOMING) nextValue = (0, _zoom.stopZooming)(value, x, y, props.scaleFactor, props);
      break;
    case _constants.TOOL_AUTO:
    case _constants.TOOL_PAN:
      if (value.mode === _constants.MODE_PANNING) nextValue = (0, _pan.stopPanning)(value);
      break;
    default:
      return value;
  }
  event.preventDefault();
  return nextValue;
}
function onDoubleClick(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var _ref4 = coords || getMousePosition(event, ViewerDOM),
    x = _ref4.x,
    y = _ref4.y;
  var nextValue = value;
  if (tool === _constants.TOOL_AUTO && !props.disableDoubleClickZoomWithToolAuto) {
    var _props$modifierKeys = props.modifierKeys,
      modifierKeys = _props$modifierKeys === void 0 ? [] : _props$modifierKeys;
    var SVGPoint = (0, _common.getSVGPoint)(value, x, y);
    var modifierKeysReducer = function modifierKeysReducer(current, modifierKey) {
      return current || event.getModifierState(modifierKey);
    };
    var modifierKeyActive = modifierKeys.reduce(modifierKeysReducer, false);
    var scaleFactor = modifierKeyActive ? 1 / props.scaleFactor : props.scaleFactor;
    nextValue = (0, _zoom.zoom)(value, SVGPoint.x, SVGPoint.y, scaleFactor, props);
  }
  event.preventDefault();
  return nextValue;
}
function onWheel(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var _ref5 = coords || getMousePosition(event, ViewerDOM),
    x = _ref5.x,
    y = _ref5.y;
  if (!props.detectWheel) return value;
  var delta = Math.max(-1, Math.min(1, event.deltaY));
  var scaleFactor = (0, _mapRange.default)(delta, -1, 1, props.scaleFactorOnWheel, 1 / props.scaleFactorOnWheel);
  var SVGPoint = (0, _common.getSVGPoint)(value, x, y);
  var nextValue = (0, _zoom.zoom)(value, SVGPoint.x, SVGPoint.y, scaleFactor, props);
  event.preventDefault();
  return nextValue;
}
function onMouseEnterOrLeave(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var nextValue = (0, _common.setFocus)(value, event.type === 'mouseenter');
  event.preventDefault();
  return nextValue;
}
function onInterval(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var x = coords.x,
    y = coords.y;
  if (!([_constants.TOOL_NONE, _constants.TOOL_AUTO].indexOf(tool) >= 0)) return value;
  if (!props.detectAutoPan) return value;
  if (!value.focus) return value;
  return (0, _pan.autoPanIfNeeded)(value, x, y);
}