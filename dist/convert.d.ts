interface Options {
    exclude?: string[];
}
export declare const isUpperCase: (char: string) => boolean;
export declare const containsSpecialCharacters: (str: string) => boolean;
export declare const normalize: (str: string) => string;
export declare const PascalCase: (str: string, options?: Options) => string;
export declare const pascalCase: (str: string, options?: Options) => string;
export declare const camelCase: (str: string, options?: Options) => string;
export declare const kebabCase: (str?: string) => string;
export declare const camelToSnakeCase: (str: string) => string;
export declare const camelToSlugCase: (str: string) => string;
export declare const snakeCase: (str: string) => string;
export declare const upperSnakeCase: (str: string) => string;
export declare const slugCase: (str: string) => string;
export declare const constCase: (str: string, startChar?: string) => string;
export {};
//# sourceMappingURL=convert.d.ts.map