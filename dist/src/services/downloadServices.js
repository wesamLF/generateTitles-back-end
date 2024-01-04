"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validJSON = void 0;
const validJSON = (data) => {
    if (data.length === 0 || !data)
        throw new Error();
    return data;
};
exports.validJSON = validJSON;
