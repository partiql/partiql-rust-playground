"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Toolbar;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("../constants");
var _zoom = require("../features/zoom");
var _iconCursor = _interopRequireDefault(require("./icon-cursor"));
var _iconPan = _interopRequireDefault(require("./icon-pan"));
var _iconZoomIn = _interopRequireDefault(require("./icon-zoom-in"));
var _iconZoomOut = _interopRequireDefault(require("./icon-zoom-out"));
var _iconFit = _interopRequireDefault(require("./icon-fit"));
var _toolbarButton = _interopRequireDefault(require("./toolbar-button"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Toolbar(_ref) {
  var tool = _ref.tool,
    value = _ref.value,
    onChangeValue = _ref.onChangeValue,
    onChangeTool = _ref.onChangeTool,
    activeToolColor = _ref.activeToolColor,
    position = _ref.position,
    SVGAlignX = _ref.SVGAlignX,
    SVGAlignY = _ref.SVGAlignY;
  var handleChangeTool = function handleChangeTool(event, tool) {
    onChangeTool(tool);
    event.stopPropagation();
    event.preventDefault();
  };
  var handleFit = function handleFit(event) {
    onChangeValue((0, _zoom.fitToViewer)(value, SVGAlignX, SVGAlignY));
    event.stopPropagation();
    event.preventDefault();
  };
  var isHorizontal = [_constants.POSITION_TOP, _constants.POSITION_BOTTOM].indexOf(position) >= 0;
  var style = {
    //position
    position: "absolute",
    transform: [_constants.POSITION_TOP, _constants.POSITION_BOTTOM].indexOf(position) >= 0 ? "translate(-50%, 0px)" : "none",
    top: [_constants.POSITION_LEFT, _constants.POSITION_RIGHT, _constants.POSITION_TOP].indexOf(position) >= 0 ? "5px" : "unset",
    left: [_constants.POSITION_TOP, _constants.POSITION_BOTTOM].indexOf(position) >= 0 ? "50%" : _constants.POSITION_LEFT === position ? "5px" : "unset",
    right: [_constants.POSITION_RIGHT].indexOf(position) >= 0 ? "5px" : "unset",
    bottom: [_constants.POSITION_BOTTOM].indexOf(position) >= 0 ? "5px" : "unset",
    //inner styling
    backgroundColor: "rgba(19, 20, 22, 0.90)",
    borderRadius: "2px",
    display: "flex",
    flexDirection: isHorizontal ? "row" : "column",
    padding: isHorizontal ? "1px 2px" : "2px 1px"
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: style,
    role: "toolbar"
  }, /*#__PURE__*/_react.default.createElement(_toolbarButton.default, {
    toolbarPosition: position,
    active: tool === _constants.TOOL_NONE,
    activeColor: activeToolColor,
    name: "unselect-tools",
    title: "Selection",
    onClick: function onClick(event) {
      return handleChangeTool(event, _constants.TOOL_NONE);
    }
  }, /*#__PURE__*/_react.default.createElement(_iconCursor.default, null)), /*#__PURE__*/_react.default.createElement(_toolbarButton.default, {
    toolbarPosition: position,
    active: tool === _constants.TOOL_PAN,
    activeColor: activeToolColor,
    name: "select-tool-pan",
    title: "Pan",
    onClick: function onClick(event) {
      return handleChangeTool(event, _constants.TOOL_PAN);
    }
  }, /*#__PURE__*/_react.default.createElement(_iconPan.default, null)), /*#__PURE__*/_react.default.createElement(_toolbarButton.default, {
    toolbarPosition: position,
    active: tool === _constants.TOOL_ZOOM_IN,
    activeColor: activeToolColor,
    name: "select-tool-zoom-in",
    title: "Zoom in",
    onClick: function onClick(event) {
      return handleChangeTool(event, _constants.TOOL_ZOOM_IN);
    }
  }, /*#__PURE__*/_react.default.createElement(_iconZoomIn.default, null)), /*#__PURE__*/_react.default.createElement(_toolbarButton.default, {
    toolbarPosition: position,
    active: tool === _constants.TOOL_ZOOM_OUT,
    activeColor: activeToolColor,
    name: "select-tool-zoom-out",
    title: "Zoom out",
    onClick: function onClick(event) {
      return handleChangeTool(event, _constants.TOOL_ZOOM_OUT);
    }
  }, /*#__PURE__*/_react.default.createElement(_iconZoomOut.default, null)), /*#__PURE__*/_react.default.createElement(_toolbarButton.default, {
    toolbarPosition: position,
    active: false,
    activeColor: activeToolColor,
    name: "fit-to-viewer",
    title: "Fit to viewer",
    onClick: function onClick(event) {
      return handleFit(event);
    }
  }, /*#__PURE__*/_react.default.createElement(_iconFit.default, null)));
}
Toolbar.propTypes = {
  tool: _propTypes.default.string.isRequired,
  onChangeTool: _propTypes.default.func.isRequired,
  value: _propTypes.default.object.isRequired,
  onChangeValue: _propTypes.default.func.isRequired,
  //customizations
  position: _propTypes.default.oneOf([_constants.POSITION_TOP, _constants.POSITION_RIGHT, _constants.POSITION_BOTTOM, _constants.POSITION_LEFT]),
  SVGAlignX: _propTypes.default.oneOf([_constants.ALIGN_CENTER, _constants.ALIGN_LEFT, _constants.ALIGN_RIGHT]),
  SVGAlignY: _propTypes.default.oneOf([_constants.ALIGN_CENTER, _constants.ALIGN_TOP, _constants.ALIGN_BOTTOM]),
  activeToolColor: _propTypes.default.string
};
Toolbar.defaultProps = {
  position: _constants.POSITION_RIGHT,
  SVGAlignX: _constants.ALIGN_LEFT,
  SVGAlignY: _constants.ALIGN_TOP,
  activeToolColor: '#1CA6FC'
};