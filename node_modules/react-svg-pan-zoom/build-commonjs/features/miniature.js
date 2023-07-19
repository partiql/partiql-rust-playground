"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeMiniature = closeMiniature;
exports.openMiniature = openMiniature;
var _common = require("./common");
function openMiniature(value) {
  return (0, _common.set)(value, {
    miniatureOpen: true
  });
}
function closeMiniature(value) {
  return (0, _common.set)(value, {
    miniatureOpen: false
  });
}