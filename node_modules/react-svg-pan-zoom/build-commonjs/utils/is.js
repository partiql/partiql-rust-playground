"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNullOrUndefined = isNullOrUndefined;
function isNullOrUndefined(value) {
  return typeof value === 'undefined' || value === null;
}