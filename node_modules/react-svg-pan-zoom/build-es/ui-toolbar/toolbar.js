import React from 'react';
import PropTypes from 'prop-types';
import { TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT, ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT, ALIGN_TOP, ALIGN_BOTTOM } from '../constants';
import { fitToViewer } from '../features/zoom';
import IconCursor from './icon-cursor';
import IconPan from './icon-pan';
import IconZoomIn from './icon-zoom-in';
import IconZoomOut from './icon-zoom-out';
import IconFit from './icon-fit';
import ToolbarButton from './toolbar-button';
export default function Toolbar(_ref) {
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
    onChangeValue(fitToViewer(value, SVGAlignX, SVGAlignY));
    event.stopPropagation();
    event.preventDefault();
  };
  var isHorizontal = [POSITION_TOP, POSITION_BOTTOM].indexOf(position) >= 0;
  var style = {
    //position
    position: "absolute",
    transform: [POSITION_TOP, POSITION_BOTTOM].indexOf(position) >= 0 ? "translate(-50%, 0px)" : "none",
    top: [POSITION_LEFT, POSITION_RIGHT, POSITION_TOP].indexOf(position) >= 0 ? "5px" : "unset",
    left: [POSITION_TOP, POSITION_BOTTOM].indexOf(position) >= 0 ? "50%" : POSITION_LEFT === position ? "5px" : "unset",
    right: [POSITION_RIGHT].indexOf(position) >= 0 ? "5px" : "unset",
    bottom: [POSITION_BOTTOM].indexOf(position) >= 0 ? "5px" : "unset",
    //inner styling
    backgroundColor: "rgba(19, 20, 22, 0.90)",
    borderRadius: "2px",
    display: "flex",
    flexDirection: isHorizontal ? "row" : "column",
    padding: isHorizontal ? "1px 2px" : "2px 1px"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: style,
    role: "toolbar"
  }, /*#__PURE__*/React.createElement(ToolbarButton, {
    toolbarPosition: position,
    active: tool === TOOL_NONE,
    activeColor: activeToolColor,
    name: "unselect-tools",
    title: "Selection",
    onClick: function onClick(event) {
      return handleChangeTool(event, TOOL_NONE);
    }
  }, /*#__PURE__*/React.createElement(IconCursor, null)), /*#__PURE__*/React.createElement(ToolbarButton, {
    toolbarPosition: position,
    active: tool === TOOL_PAN,
    activeColor: activeToolColor,
    name: "select-tool-pan",
    title: "Pan",
    onClick: function onClick(event) {
      return handleChangeTool(event, TOOL_PAN);
    }
  }, /*#__PURE__*/React.createElement(IconPan, null)), /*#__PURE__*/React.createElement(ToolbarButton, {
    toolbarPosition: position,
    active: tool === TOOL_ZOOM_IN,
    activeColor: activeToolColor,
    name: "select-tool-zoom-in",
    title: "Zoom in",
    onClick: function onClick(event) {
      return handleChangeTool(event, TOOL_ZOOM_IN);
    }
  }, /*#__PURE__*/React.createElement(IconZoomIn, null)), /*#__PURE__*/React.createElement(ToolbarButton, {
    toolbarPosition: position,
    active: tool === TOOL_ZOOM_OUT,
    activeColor: activeToolColor,
    name: "select-tool-zoom-out",
    title: "Zoom out",
    onClick: function onClick(event) {
      return handleChangeTool(event, TOOL_ZOOM_OUT);
    }
  }, /*#__PURE__*/React.createElement(IconZoomOut, null)), /*#__PURE__*/React.createElement(ToolbarButton, {
    toolbarPosition: position,
    active: false,
    activeColor: activeToolColor,
    name: "fit-to-viewer",
    title: "Fit to viewer",
    onClick: function onClick(event) {
      return handleFit(event);
    }
  }, /*#__PURE__*/React.createElement(IconFit, null)));
}
Toolbar.propTypes = {
  tool: PropTypes.string.isRequired,
  onChangeTool: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  //customizations
  position: PropTypes.oneOf([POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT]),
  SVGAlignX: PropTypes.oneOf([ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT]),
  SVGAlignY: PropTypes.oneOf([ALIGN_CENTER, ALIGN_TOP, ALIGN_BOTTOM]),
  activeToolColor: PropTypes.string
};
Toolbar.defaultProps = {
  position: POSITION_RIGHT,
  SVGAlignX: ALIGN_LEFT,
  SVGAlignY: ALIGN_TOP,
  activeToolColor: '#1CA6FC'
};