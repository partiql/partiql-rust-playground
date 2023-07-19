function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { decompose } from '../features/common';
var ViewerEvent = /*#__PURE__*/function () {
  function ViewerEvent(originalEvent, value, SVGViewer) {
    _classCallCheck(this, ViewerEvent);
    this.originalEvent = originalEvent;
    this.value = value;
    this.SVGViewer = SVGViewer;
  }
  _createClass(ViewerEvent, [{
    key: "scaleFactor",
    get: function get() {
      this._cacheDecomposedValue = this._cacheDecomposedValue || decompose(this.value);
      return this._cacheDecomposedValue.scaleFactor;
    }
  }, {
    key: "translationX",
    get: function get() {
      this._cacheDecomposedValue = this._cacheDecomposedValue || decompose(this.value);
      return this._cacheDecomposedValue.translationX;
    }
  }, {
    key: "translationY",
    get: function get() {
      this._cacheDecomposedValue = this._cacheDecomposedValue || decompose(this.value);
      return this._cacheDecomposedValue.translationY;
    }
  }, {
    key: "preventDefault",
    value: function preventDefault() {
      this.originalEvent.preventDefault();
    }
  }, {
    key: "stopPropagation",
    value: function stopPropagation() {
      this.originalEvent.stopPropagation();
    }
  }]);
  return ViewerEvent;
}();
export { ViewerEvent as default };