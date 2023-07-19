function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
import React from 'react';
import PropTypes from 'prop-types';
import { POSITION_TOP, POSITION_BOTTOM } from '../constants';
var ToolbarButton = /*#__PURE__*/function (_React$Component) {
  _inherits(ToolbarButton, _React$Component);
  var _super = _createSuper(ToolbarButton);
  function ToolbarButton(props) {
    var _this;
    _classCallCheck(this, ToolbarButton);
    _this = _super.call(this, props);
    _this.state = {
      hover: false
    };
    return _this;
  }
  _createClass(ToolbarButton, [{
    key: "change",
    value: function change(event) {
      event.preventDefault();
      event.stopPropagation();
      switch (event.type) {
        case 'mouseenter':
        case 'touchstart':
          this.setState({
            hover: true
          });
          break;
        case 'mouseleave':
        case 'touchend':
        case 'touchcancel':
          this.setState({
            hover: false
          });
          break;
        default:
        //noop
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var style = {
        display: "block",
        width: "24px",
        height: "24px",
        margin: [POSITION_TOP, POSITION_BOTTOM].indexOf(this.props.toolbarPosition) >= 0 ? "2px 1px" : "1px 2px",
        color: this.props.active || this.state.hover ? this.props.activeColor : '#FFF',
        transition: "color 200ms ease",
        background: "none",
        padding: "0px",
        border: "0px",
        outline: "0px",
        cursor: "pointer"
      };
      return /*#__PURE__*/React.createElement("button", {
        onMouseEnter: function onMouseEnter(e) {
          return _this2.change(e);
        },
        onMouseLeave: function onMouseLeave(e) {
          return _this2.change(e);
        },
        onTouchStart: function onTouchStart(e) {
          _this2.change(e);
          _this2.props.onClick(e);
        },
        onTouchEnd: function onTouchEnd(e) {
          return _this2.change(e);
        },
        onTouchCancel: function onTouchCancel(e) {
          return _this2.change(e);
        },
        onClick: this.props.onClick,
        style: style,
        title: this.props.title,
        name: this.props.name,
        type: "button"
      }, this.props.children);
    }
  }]);
  return ToolbarButton;
}(React.Component);
export { ToolbarButton as default };
ToolbarButton.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  toolbarPosition: PropTypes.string.isRequired,
  activeColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
};