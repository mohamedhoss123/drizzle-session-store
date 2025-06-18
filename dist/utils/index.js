"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daysToMilliseconds = void 0;
const MILLISECONDS_PER_MINUTE = 60000;
const daysToMilliseconds = (days) => MILLISECONDS_PER_MINUTE * 60 * 24 * days;
exports.daysToMilliseconds = daysToMilliseconds;
