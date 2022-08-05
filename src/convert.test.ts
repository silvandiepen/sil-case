import { PascalCase, camelCase, snakeCase,slugCase,upperSnakeCase } from "./convert";

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
      expect(PascalCase(entry.input)).toBe(entry.output);
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
      expect(camelCase(entry.input)).toBe(entry.output);
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
      expect(snakeCase(entry.input)).toBe(entry.output);
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
      expect(upperSnakeCase(entry.input)).toBe(entry.output);
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
      expect(slugCase(entry.input)).toBe(entry.output);
    });
  });
});
