"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = exports.PORT = void 0;
require("dotenv/config");
const PORT = process.env.PORT;
exports.PORT = PORT;
const URL = process.env.NODE_ENV === 'test'
    ? process.env.TEST_URL
    : process.env.URL;
exports.URL = URL;
