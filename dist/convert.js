"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelCase = exports.PascalCase = void 0;
const PascalCase = (str) => {
    if (!str)
        return "";
    return String(str)
        .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "$")
        .replace(/[^A-Za-z0-9]+/g, "$")
        .replace(/([a-z])([A-Z])/g, (m, a, b) => a + "$" + b)
        .toLowerCase()
        .replace(/(\$)(\w?)/g, (m, a, b) => b.toUpperCase());
};
exports.PascalCase = PascalCase;
const camelCase = (str) => {
    if (!str)
        return "";
    const newStr = String(str)
        .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "$")
        .replace(/[^A-Za-z0-9]+/g, "$")
        .replace(/([a-z])([A-Z])/g, (m, a, b) => a + "$" + b)
        .toLowerCase()
        .replace(/(\$)(\w?)/g, (m, a, b) => b.toUpperCase());
    return newStr.charAt(0).toLowerCase() + newStr.substring(1);
};
exports.camelCase = camelCase;
//# sourceMappingURL=convert.js.map