"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugCase = exports.upperSnakeCase = exports.snakeCase = exports.camelToSlugCase = exports.camelToSnakeCase = exports.kebabCase = exports.camelCase = exports.PascalCase = void 0;
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
const kebabCase = (str = "") => {
    if (!str)
        return "";
    const matches = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
    return matches ? matches.map((x) => x.toLowerCase()).join("-") : "";
};
exports.kebabCase = kebabCase;
const camelToSnakeCase = (str) => {
    if (!str)
        return "";
    var result = str.replace(/([A-Z])/g, " $1");
    return result.split(" ").join("_").toLowerCase();
};
exports.camelToSnakeCase = camelToSnakeCase;
const camelToSlugCase = (str) => {
    if (!str)
        return "";
    var result = str.replace(/([A-Z])/g, " $1");
    return result.split(" ").join("-").toLowerCase();
};
exports.camelToSlugCase = camelToSlugCase;
const snakeCase = (str) => {
    if (!str)
        return "";
    return (0, exports.camelToSnakeCase)((0, exports.camelCase)(str));
};
exports.snakeCase = snakeCase;
const upperSnakeCase = (str) => {
    if (!str)
        return "";
    return (0, exports.camelToSnakeCase)((0, exports.camelCase)(str)).toUpperCase();
};
exports.upperSnakeCase = upperSnakeCase;
const slugCase = (str) => {
    if (!str)
        return "";
    return (0, exports.camelToSlugCase)((0, exports.camelCase)(str));
};
exports.slugCase = slugCase;
//# sourceMappingURL=convert.js.map