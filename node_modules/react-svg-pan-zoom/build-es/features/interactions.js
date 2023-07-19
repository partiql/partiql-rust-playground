import { MODE_PANNING, MODE_ZOOMING, TOOL_AUTO, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT } from '../constants';
import { getSVGPoint, setFocus } from './common';
import { autoPanIfNeeded, startPanning, stopPanning, updatePanning } from './pan';
import { startZooming, stopZooming, updateZooming, zoom } from './zoom';
import mapRange from '../utils/mapRange';
export function getMousePosition(event, ViewerDOM) {
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
export function onMouseDown(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var _ref = coords || getMousePosition(event, ViewerDOM),
    x = _ref.x,
    y = _ref.y;
  var nextValue = value;
  switch (tool) {
    case TOOL_ZOOM_OUT:
      var SVGPoint = getSVGPoint(value, x, y);
      nextValue = zoom(value, SVGPoint.x, SVGPoint.y, 1 / props.scaleFactor, props);
      break;
    case TOOL_ZOOM_IN:
      nextValue = startZooming(value, x, y);
      break;
    case TOOL_AUTO:
    case TOOL_PAN:
      nextValue = startPanning(value, x, y);
      break;
    default:
      return value;
  }
  event.preventDefault();
  return nextValue;
}
export function onMouseMove(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var _ref2 = coords || getMousePosition(event, ViewerDOM),
    x = _ref2.x,
    y = _ref2.y;
  var forceExit = event.buttons === 0; //the mouse exited and reentered into svg
  var nextValue = value;
  switch (tool) {
    case TOOL_ZOOM_IN:
      if (value.mode === MODE_ZOOMING) nextValue = forceExit ? stopZooming(value, x, y, props.scaleFactor, props) : updateZooming(value, x, y);
      break;
    case TOOL_AUTO:
    case TOOL_PAN:
      if (value.mode === MODE_PANNING) nextValue = forceExit ? stopPanning(value) : updatePanning(value, x, y, props.preventPanOutside ? 20 : undefined);
      break;
    default:
      return value;
  }
  event.preventDefault();
  return nextValue;
}
export function onMouseUp(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var _ref3 = coords || getMousePosition(event, ViewerDOM),
    x = _ref3.x,
    y = _ref3.y;
  var nextValue = value;
  switch (tool) {
    case TOOL_ZOOM_OUT:
      if (value.mode === MODE_ZOOMING) nextValue = stopZooming(value, x, y, 1 / props.scaleFactor, props);
      break;
    case TOOL_ZOOM_IN:
      if (value.mode === MODE_ZOOMING) nextValue = stopZooming(value, x, y, props.scaleFactor, props);
      break;
    case TOOL_AUTO:
    case TOOL_PAN:
      if (value.mode === MODE_PANNING) nextValue = stopPanning(value);
      break;
    default:
      return value;
  }
  event.preventDefault();
  return nextValue;
}
export function onDoubleClick(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var _ref4 = coords || getMousePosition(event, ViewerDOM),
    x = _ref4.x,
    y = _ref4.y;
  var nextValue = value;
  if (tool === TOOL_AUTO && !props.disableDoubleClickZoomWithToolAuto) {
    var _props$modifierKeys = props.modifierKeys,
      modifierKeys = _props$modifierKeys === void 0 ? [] : _props$modifierKeys;
    var SVGPoint = getSVGPoint(value, x, y);
    var modifierKeysReducer = function modifierKeysReducer(current, modifierKey) {
      return current || event.getModifierState(modifierKey);
    };
    var modifierKeyActive = modifierKeys.reduce(modifierKeysReducer, false);
    var scaleFactor = modifierKeyActive ? 1 / props.scaleFactor : props.scaleFactor;
    nextValue = zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor, props);
  }
  event.preventDefault();
  return nextValue;
}
export function onWheel(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var _ref5 = coords || getMousePosition(event, ViewerDOM),
    x = _ref5.x,
    y = _ref5.y;
  if (!props.detectWheel) return value;
  var delta = Math.max(-1, Math.min(1, event.deltaY));
  var scaleFactor = mapRange(delta, -1, 1, props.scaleFactorOnWheel, 1 / props.scaleFactorOnWheel);
  var SVGPoint = getSVGPoint(value, x, y);
  var nextValue = zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor, props);
  event.preventDefault();
  return nextValue;
}
export function onMouseEnterOrLeave(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var nextValue = setFocus(value, event.type === 'mouseenter');
  event.preventDefault();
  return nextValue;
}
export function onInterval(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var x = coords.x,
    y = coords.y;
  if (!([TOOL_NONE, TOOL_AUTO].indexOf(tool) >= 0)) return value;
  if (!props.detectAutoPan) return value;
  if (!value.focus) return value;
  return autoPanIfNeeded(value, x, y);
}