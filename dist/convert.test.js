"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convert_1 = require("./convert");
describe("Normalize", () => {
    it('Should convert to the right string - accents', () => {
        expect((0, convert_1.normalize)('helloéèhello')).toBe('helloeehello');
    });
    it('Should convert to the right string - Maltese', () => {
        expect((0, convert_1.normalize)('Birżebbuġa')).toBe('Birzebbuga');
    });
    it('Should convert to the right string - Maltese', () => {
        expect((0, convert_1.normalize)('Ħaż-Żebbuġ')).toBe('Haz-Zebbug');
    });
});
describe("PascalCase", () => {
    const toPascalCase = [
        { input: "PascalCase", output: "PascalCase" },
        { input: "pascalCase", output: "PascalCase" },
        { input: "pascal Case", output: "PascalCase" },
        { input: "pascal-case", output: "PascalCase" },
        { input: "PASCAL-case", output: "PascalCase" },
        {
            input: "pascal:case",
            output: "Pascal:case",
            options: {
                exclude: [":"],
            },
        },
    ];
    toPascalCase.forEach((entry) => {
        it(`should convert to PascalCase: ${entry.input} -> ${entry.output}`, () => {
            entry.options
                ? expect((0, convert_1.PascalCase)(entry.input, entry.options)).toBe(entry.output)
                : expect((0, convert_1.PascalCase)(entry.input)).toBe(entry.output);
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
        {
            input: "camel:case",
            output: "camel:case",
            options: {
                exclude: [":"],
            },
        },
    ];
    toCamelCase.forEach((entry) => {
        it(`should convert to camelCase: ${entry.input} -> ${entry.output}`, () => {
            entry.options
                ? expect((0, convert_1.camelCase)(entry.input, entry.options)).toBe(entry.output)
                : expect((0, convert_1.camelCase)(entry.input)).toBe(entry.output);
        });
    });
});
describe("kebabCase", () => {
    const toKebabCase = [
        { input: "KebabCase", output: "kebab-case" },
        { input: "kebabCase", output: "kebab-case" },
        { input: "kebab Case", output: "kebab-case" },
        { input: "kebab-case", output: "kebab-case" },
        { input: "KEBAB-case", output: "kebab-case" },
        { input: "KEBAB, case", output: "kebab-case" },
    ];
    toKebabCase.forEach((entry) => {
        it(`should convert to kebabCase: ${entry.input} -> ${entry.output}`, () => {
            expect((0, convert_1.kebabCase)(entry.input)).toBe(entry.output);
        });
    });
});
describe("snakeCase", () => {
    const toSnakeCase = [
        { input: "SnakeCase", output: "snake_case" },
        { input: "snakeCase", output: "snake_case" },
        { input: "snake Case", output: "snake_case" },
        { input: "snake-case", output: "snake_case" },
        { input: "SNAKE-case", output: "snake_case" },
    ];
    toSnakeCase.forEach((entry) => {
        it(`should convert to snakeCase: ${entry.input} -> ${entry.output}`, () => {
            expect((0, convert_1.snakeCase)(entry.input)).toBe(entry.output);
        });
    });
});
describe("upperSnakeCase", () => {
    const toUpperSnakeCase = [
        { input: "SnakeCase", output: "SNAKE_CASE" },
        { input: "snakeCase", output: "SNAKE_CASE" },
        { input: "snake Case", output: "SNAKE_CASE" },
        { input: "snake-case", output: "SNAKE_CASE" },
        { input: "SNAKE-case", output: "SNAKE_CASE" },
    ];
    toUpperSnakeCase.forEach((entry) => {
        it(`should convert to upperSnakeCase: ${entry.input} -> ${entry.output}`, () => {
            expect((0, convert_1.upperSnakeCase)(entry.input)).toBe(entry.output);
        });
    });
});
describe("slugCase", () => {
    const toSlugCase = [
        { input: "SlugCase", output: "slug-case" },
        { input: "slugCase", output: "slug-case" },
        { input: "slug Case", output: "slug-case" },
        { input: "slug-case", output: "slug-case" },
        { input: "SLUG-case", output: "slug-case" },
    ];
    toSlugCase.forEach((entry) => {
        it(`should convert to slugCase: ${entry.input} -> ${entry.output}`, () => {
            expect((0, convert_1.slugCase)(entry.input)).toBe(entry.output);
        });
    });
});
describe('CONST_CASE', () => {
    it('should return string in upper snake case', () => {
        const result = (0, convert_1.constCase)('hello world');
        expect(result).toBe('HELLO_WORLD');
    });
    it('should return string in upper snake case with a leading underscore if it starts with a number', () => {
        const result = (0, convert_1.constCase)('1hello world');
        expect(result).toBe('_1HELLO_WORLD');
    });
    it('should return string in upper snake case with a custom character if it starts with a number', () => {
        const result = (0, convert_1.constCase)('1hello world', '=');
        expect(result).toBe('=1HELLO_WORLD');
    });
});
//# sourceMappingURL=convert.test.js.map