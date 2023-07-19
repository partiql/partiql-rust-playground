"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoPanIfNeeded = autoPanIfNeeded;
exports.pan = pan;
exports.startPanning = startPanning;
exports.stopPanning = stopPanning;
exports.updatePanning = updatePanning;
var _constants = require("../constants");
var _common = require("./common");
var _transformationMatrix = require("transformation-matrix");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Atomic pan operation
 * @param value
 * @param SVGDeltaX drag movement
 * @param SVGDeltaY drag movement
 * @param panLimit forces the image to keep at least x pixel inside the viewer
 * @returns {Object}
 */
function pan(value, SVGDeltaX, SVGDeltaY) {
  var panLimit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var matrix = (0, _transformationMatrix.transform)((0, _transformationMatrix.fromObject)(value),
  //2
  (0, _transformationMatrix.translate)(SVGDeltaX, SVGDeltaY) //1
  );

  // apply pan limits
  if (panLimit) {
    var _applyToPoints = (0, _transformationMatrix.applyToPoints)(matrix, [{
        x: value.SVGMinX + panLimit,
        y: value.SVGMinY + panLimit
      }, {
        x: value.SVGMinX + value.SVGWidth - panLimit,
        y: value.SVGMinY + value.SVGHeight - panLimit
      }]),
      _applyToPoints2 = _slicedToArray(_applyToPoints, 2),
      _applyToPoints2$ = _applyToPoints2[0],
      x1 = _applyToPoints2$.x,
      y1 = _applyToPoints2$.y,
      _applyToPoints2$2 = _applyToPoints2[1],
      x2 = _applyToPoints2$2.x,
      y2 = _applyToPoints2$2.y;

    //x limit
    var moveX = 0;
    if (value.viewerWidth - x1 < 0) moveX = value.viewerWidth - x1;else if (x2 < 0) moveX = -x2;

    //y limit
    var moveY = 0;
    if (value.viewerHeight - y1 < 0) moveY = value.viewerHeight - y1;else if (y2 < 0) moveY = -y2;

    //apply limits
    matrix = (0, _transformationMatrix.transform)((0, _transformationMatrix.translate)(moveX, moveY), matrix);
  }
  return (0, _common.set)(value, _objectSpread({
    mode: _constants.MODE_IDLE
  }, matrix), _constants.ACTION_PAN);
}

/**
 * Start pan operation lifecycle
 * @param value
 * @param viewerX
 * @param viewerY
 * @return {ReadonlyArray<unknown>}
 */
function startPanning(value, viewerX, viewerY) {
  return (0, _common.set)(value, {
    mode: _constants.MODE_PANNING,
    startX: viewerX,
    startY: viewerY,
    endX: viewerX,
    endY: viewerY
  }, _constants.ACTION_PAN);
}

/**
 * Continue pan operation lifecycle
 * @param value
 * @param viewerX
 * @param viewerY
 * @param panLimit
 * @return {ReadonlyArray<unknown>}
 */
function updatePanning(value, viewerX, viewerY, panLimit) {
  if (value.mode !== _constants.MODE_PANNING) throw new Error('update pan not allowed in this mode ' + value.mode);
  var endX = value.endX,
    endY = value.endY;
  var start = (0, _common.getSVGPoint)(value, endX, endY);
  var end = (0, _common.getSVGPoint)(value, viewerX, viewerY);
  var deltaX = end.x - start.x;
  var deltaY = end.y - start.y;
  var nextValue = pan(value, deltaX, deltaY, panLimit);
  return (0, _common.set)(nextValue, {
    mode: _constants.MODE_PANNING,
    endX: viewerX,
    endY: viewerY
  }, _constants.ACTION_PAN);
}

/**
 * Stop pan operation lifecycle
 * @param value
 * @return {ReadonlyArray<unknown>}
 */
function stopPanning(value) {
  return (0, _common.set)(value, {
    mode: _constants.MODE_IDLE,
    startX: null,
    startY: null,
    endX: null,
    endY: null
  }, _constants.ACTION_PAN);
}

/**
 * when pointer is on viewer edge -> pan image
 * @param value
 * @param viewerX
 * @param viewerY
 * @return {ReadonlyArray<any>}
 */
function autoPanIfNeeded(value, viewerX, viewerY) {
  var deltaX = 0;
  var deltaY = 0;
  if (viewerY <= 20) deltaY = 2;
  if (value.viewerWidth - viewerX <= 20) deltaX = -2;
  if (value.viewerHeight - viewerY <= 20) deltaY = -2;
  if (viewerX <= 20) deltaX = 2;
  deltaX = deltaX / value.d;
  deltaY = deltaY / value.d;
  return deltaX === 0 && deltaY === 0 ? value : pan(value, deltaX, deltaY);
}