interface Options {
    exclude?: string[];
    startChar?: string;
}
declare const isUpperCase: (char: string) => boolean;
declare const containsSpecialCharacters: (str: string) => boolean;
declare const normalize: (str: string, exclude?: Set<string>) => string;
declare const PascalCase: (str: string, options?: Options) => string;
declare const pascalCase: (str: string, options?: Options) => string;
declare const camelCase: (str: string, options?: Options) => string;
declare const kebabCase: (str?: string, options?: Options) => string;
declare const camelToSnakeCase: (str: string) => string;
declare const camelToSlugCase: (str: string) => string;
declare const snakeCase: (str: string, options?: Options) => string;
declare const upperSnakeCase: (str: string, options?: Options) => string;
declare const slugCase: (str: string, options?: Options) => string;
declare const constCase: (str: string, options?: Options) => string;
declare const sentenceCase: (str: string, options?: Options) => string;

export { PascalCase, camelCase, camelToSlugCase, camelToSnakeCase, constCase, containsSpecialCharacters, isUpperCase, kebabCase, normalize, pascalCase, sentenceCase, slugCase, snakeCase, upperSnakeCase };
