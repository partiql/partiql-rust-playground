"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapRange;
/**
 * Convert (re-map) an input value range into a destination range.
 * @param value
 * @param sourceStart
 * @param sourceEnd
 * @param targetStart
 * @param targetEnd
 * @return number
 */

function mapRange(value, sourceStart, sourceEnd, targetStart, targetEnd) {
  return targetStart + (targetEnd - targetStart) * (value - sourceStart) / (sourceEnd - sourceStart);
}