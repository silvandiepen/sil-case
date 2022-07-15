"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convert_1 = require("./convert");
describe("PascalCase", () => {
    const toPascalCase = [
        { input: "PascalCase", output: "PascalCase" },
        { input: "pascalCase", output: "PascalCase" },
        { input: "pascal Case", output: "PascalCase" },
        { input: "pascal-case", output: "PascalCase" },
        { input: "PASCAL-case", output: "PascalCase" },
    ];
    toPascalCase.forEach((entry) => {
        it(`should convert to PascalCase: ${entry.input} -> ${entry.output}`, () => {
            expect((0, convert_1.PascalCase)(entry.input)).toBe(entry.output);
        });
    });
});
describe("camelCase", () => {
    const toCamelCase = [
        { input: "CamelCase", output: "camelCase" },
        { input: "camelCase", output: "camelCase" },
        { input: "camel Case", output: "camelCase" },
        { input: "camel-case", output: "camelCase" },
        { input: "CAMEL-case", output: "camelCase" },
    ];
    toCamelCase.forEach((entry) => {
        it(`should convert to camelCase: ${entry.input} -> ${entry.output}`, () => {
            expect((0, convert_1.camelCase)(entry.input)).toBe(entry.output);
        });
    });
});
//# sourceMappingURL=convert.test.js.map