"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _viewer = _interopRequireDefault(require("./viewer"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("./constants");
var _excluded = ["width", "height", "onChangeTool", "onChangeValue"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var UncontrolledReactSVGPanZoom = /*#__PURE__*/function (_React$Component) {
  _inherits(UncontrolledReactSVGPanZoom, _React$Component);
  var _super = _createSuper(UncontrolledReactSVGPanZoom);
  function UncontrolledReactSVGPanZoom(props) {
    var _this;
    _classCallCheck(this, UncontrolledReactSVGPanZoom);
    _this = _super.call(this, props);
    _this.state = {
      value: props.defaultValue || {},
      tool: props.defaultTool || _constants.TOOL_NONE
    };
    _this.Viewer = null;
    _this.changeTool = _this.changeTool.bind(_assertThisInitialized(_this));
    _this.changeValue = _this.changeValue.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(UncontrolledReactSVGPanZoom, [{
    key: "changeTool",
    value: function changeTool(tool) {
      this.setState({
        tool: tool
      });
    }
  }, {
    key: "changeValue",
    value: function changeValue(value) {
      this.setState({
        value: value
      });
    }
  }, {
    key: "pan",
    value: function pan(SVGDeltaX, SVGDeltaY) {
      this.Viewer.pan(SVGDeltaX, SVGDeltaY);
    }
  }, {
    key: "zoom",
    value: function zoom(SVGPointX, SVGPointY, scaleFactor) {
      this.Viewer.zoom(SVGPointX, SVGPointY, scaleFactor);
    }
  }, {
    key: "fitSelection",
    value: function fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
      this.Viewer.fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight);
    }
  }, {
    key: "fitToViewer",
    value: function fitToViewer(SVGAlignX, SVGAlignY) {
      this.Viewer.fitToViewer(SVGAlignX, SVGAlignY);
    }
  }, {
    key: "zoomOnViewerCenter",
    value: function zoomOnViewerCenter(scaleFactor) {
      this.Viewer.zoomOnViewerCenter(scaleFactor);
    }
  }, {
    key: "setPointOnViewerCenter",
    value: function setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel) {
      this.Viewer.setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.Viewer.reset();
    }
  }, {
    key: "openMiniature",
    value: function openMiniature() {
      this.Viewer.openMiniature();
    }
  }, {
    key: "closeMiniature",
    value: function closeMiniature() {
      this.Viewer.closeMiniature();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        width = _this$props.width,
        height = _this$props.height,
        onChangeTool = _this$props.onChangeTool,
        onChangeValue = _this$props.onChangeValue,
        props = _objectWithoutProperties(_this$props, _excluded);
      var _this$state = this.state,
        tool = _this$state.tool,
        value = _this$state.value;
      return /*#__PURE__*/_react.default.createElement(_viewer.default, _extends({
        width: width,
        height: height,
        tool: tool,
        onChangeTool: this.changeTool,
        value: value,
        onChangeValue: this.changeValue,
        ref: function ref(Viewer) {
          return _this2.Viewer = Viewer;
        }
      }, props));
    }
  }]);
  return UncontrolledReactSVGPanZoom;
}(_react.default.Component);
exports.default = UncontrolledReactSVGPanZoom;
UncontrolledReactSVGPanZoom.propTypes = {
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  defaultValue: _propTypes.default.object,
  defaultTool: _propTypes.default.string
};