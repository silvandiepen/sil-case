# @sil/case

A comprehensive TypeScript library for converting strings between different case formats. This package provides utilities to transform strings into various naming conventions commonly used in programming, including camelCase, PascalCase, kebab-case, snake_case, and more.

## Features

- 🚀 Zero dependencies
- 📦 Lightweight and performant
- 🔧 TypeScript support with full type definitions
- 🌐 Handles special characters with normalization support
- ⚡ Consistent and predictable transformations
- 🧪 Well tested

## Installation

```bash
npm install @sil/case
```

## Usage

```js
import { kebabCase, camelCase, PascalCase, snakeCase } from "@sil/case";

const myString = "This Is My STRING";

console.log(kebabCase(myString));    // "this-is-my-string"
console.log(camelCase(myString));    // "thisIsMyString"
console.log(PascalCase(myString));   // "ThisIsMyString"
console.log(snakeCase(myString));    // "this_is_my_string"
```

## API Reference

### Core Conversion Functions

#### `PascalCase(str: string, options?: Options): string`
Converts a string to PascalCase (also known as UpperCamelCase). The first letter of each word is capitalized and spaces are removed.

```js
PascalCase("hello world");        // "HelloWorld"
PascalCase("hello-world");        // "HelloWorld"
PascalCase("hello_world");        // "HelloWorld"
PascalCase("helloWorld");         // "HelloWorld"
```

**Options:**
- `exclude`: Array of characters to exclude from transformation

#### `pascalCase(str: string, options?: Options): string`
Alias for `PascalCase` function.

#### `camelCase(str: string, options?: Options): string`
Converts a string to camelCase. Similar to PascalCase but the first letter is lowercase.

```js
camelCase("hello world");         // "helloWorld"
camelCase("Hello World");         // "helloWorld"
camelCase("hello-world");         // "helloWorld"
camelCase("HELLO_WORLD");         // "helloWorld"
```

**Options:**
- `exclude`: Array of characters to exclude from transformation

#### `kebabCase(str: string): string`
Converts a string to kebab-case (lowercase words separated by hyphens).

```js
kebabCase("HelloWorld");          // "hello-world"
kebabCase("helloWorld");          // "hello-world"
kebabCase("hello world");         // "hello-world"
kebabCase("HELLO_WORLD");         // "hello-world"
```

#### `snakeCase(str: string): string`
Converts a string to snake_case (lowercase words separated by underscores).

```js
snakeCase("HelloWorld");          // "hello_world"
snakeCase("helloWorld");          // "hello_world"
snakeCase("hello world");         // "hello_world"
snakeCase("hello-world");         // "hello_world"
```

#### `upperSnakeCase(str: string): string`
Converts a string to UPPER_SNAKE_CASE (uppercase words separated by underscores).

```js
upperSnakeCase("HelloWorld");     // "HELLO_WORLD"
upperSnakeCase("helloWorld");     // "HELLO_WORLD"
upperSnakeCase("hello world");    // "HELLO_WORLD"
upperSnakeCase("hello-world");    // "HELLO_WORLD"
```

#### `slugCase(str: string): string`
Alias for `kebabCase`. Converts a string to slug format (lowercase with hyphens).

```js
slugCase("Hello World!");         // "hello-world"
slugCase("HelloWorld");           // "hello-world"
```

#### `constCase(str: string, startChar?: string): string`
Converts a string to CONSTANT_CASE. Similar to upperSnakeCase but ensures the string doesn't start with a number. If it does, prepends a character (default: "_").

```js
constCase("myVariable");          // "MY_VARIABLE"
constCase("my variable");         // "MY_VARIABLE"
constCase("123 variable");        // "_123_VARIABLE"
constCase("123 variable", "$");  // "$123_VARIABLE"
```

**Parameters:**
- `startChar`: Character to prepend if the string starts with a number (default: "_")

#### `sentenceCase(str: string): string`
Converts a string to sentence case (first letter capitalized, rest lowercase, with spaces).

```js
sentenceCase("HELLO_WORLD");      // "Hello world"
sentenceCase("helloWorld");       // "Hello world"
sentenceCase("hello-world");      // "Hello world"
sentenceCase("HelloWorld");       // "Hello world"
```

### Utility Functions

#### `isUpperCase(char: string): boolean`
Checks if a character is uppercase.

```js
isUpperCase("A");                 // true
isUpperCase("a");                 // false
isUpperCase("1");                 // true (numbers are considered uppercase)
```

#### `containsSpecialCharacters(str: string): boolean`
Checks if a string contains any special characters (like accented letters).

```js
containsSpecialCharacters("hello");    // false
containsSpecialCharacters("héllo");    // true
containsSpecialCharacters("café");     // true
```

#### `normalize(str: string): string`
Normalizes special characters to their ASCII equivalents. Useful for removing accents and diacritics.

```js
normalize("café");                // "cafe"
normalize("naïve");               // "naive"
normalize("Zürich");              // "Zurich"
normalize("señor");               // "senor"
```

### Helper Functions

#### `camelToSnakeCase(str: string): string`
Converts a camelCase string directly to snake_case.

```js
camelToSnakeCase("helloWorld");   // "hello_world"
camelToSnakeCase("myVariableName"); // "my_variable_name"
```

#### `camelToSlugCase(str: string): string`
Converts a camelCase string directly to slug-case.

```js
camelToSlugCase("helloWorld");    // "hello-world"
camelToSlugCase("myVariableName"); // "my-variable-name"
```

## Special Characters Support

The library includes comprehensive support for special characters and diacritics, automatically converting them to their closest ASCII equivalents:

- `à, á, ä, â` → `a`
- `è, é, ë, ê` → `e`
- `ì, í, ï, î` → `i`
- `ò, ó, ö, ô` → `o`
- `ù, ú, ü, û` → `u`
- And many more...

## Examples

### Working with Different Input Formats

```js
import * as Case from "@sil/case";

// From various formats to camelCase
Case.camelCase("user_name");           // "userName"
Case.camelCase("user-name");           // "userName"
Case.camelCase("UserName");            // "userName"
Case.camelCase("USER_NAME");           // "userName"
Case.camelCase("user name");           // "userName"

// Handling edge cases
Case.kebabCase("");                    // ""
Case.snakeCase("   ");                 // ""
Case.PascalCase("123abc");            // "123Abc"
Case.constCase("123abc");             // "_123_ABC"

// Working with special characters
Case.normalize("José García");         // "Jose Garcia"
Case.kebabCase("José García");         // "jose-garcia"
Case.snakeCase("Øystein Åse");        // "oystein_ase"
```

### Real-World Use Cases

```js
// Converting API responses to JavaScript conventions
const apiResponse = {
  user_name: "john_doe",
  created_at: "2023-01-01",
  is_active: true
};

const jsObject = Object.keys(apiResponse).reduce((acc, key) => {
  acc[Case.camelCase(key)] = apiResponse[key];
  return acc;
}, {});
// Result: { userName: "john_doe", createdAt: "2023-01-01", isActive: true }

// Creating CSS classes from JavaScript variables
const componentName = "MyCustomButton";
const cssClass = Case.kebabCase(componentName);  // "my-custom-button"

// Creating constant names
const eventName = "user clicked button";
const EVENT_CONSTANT = Case.constCase(eventName); // "USER_CLICKED_BUTTON"

// Creating readable headers from database fields
const dbField = "created_at_timestamp";
const headerText = Case.sentenceCase(dbField);    // "Created at timestamp"
```

## TypeScript Support

The package includes full TypeScript definitions:

```typescript
interface Options {
  exclude?: string[];
}

// All functions are fully typed
import { camelCase, PascalCase } from "@sil/case";

const result: string = camelCase("hello-world");
const withOptions: string = PascalCase("hello-world", { exclude: ["-"] });
```

## Testing

The package includes comprehensive test coverage. To run tests:

```bash
npm test
```

For development with watch mode:

```bash
npm run dev:test
```

## Building

To build the package:

```bash
npm run build
```

## License

MIT © Sil van Diepen