import { specialCharacters } from "./data";

interface Options {
  exclude?: string[];
  startChar?: string;
}

/**
 * Checks if a character is uppercase
 * @param char - The character to check
 * @returns True if the character is uppercase, false otherwise
 * @example
 * isUpperCase("A") // returns true
 * isUpperCase("a") // returns false
 * isUpperCase("1") // returns true (numbers are considered uppercase)
 */
export const isUpperCase = (char: string): boolean => {
  return char === char.toUpperCase();
};

/**
 * Checks if a string contains any special characters (like accented letters)
 * @param str - The string to check
 * @returns True if the string contains special characters, false otherwise
 * @example
 * containsSpecialCharacters("hello") // returns false
 * containsSpecialCharacters("héllo") // returns true
 * containsSpecialCharacters("café") // returns true
 */
export const containsSpecialCharacters = (str: string): boolean => {
  const specialChars = Object.values(specialCharacters).flat();
  for (let i = 0; i < str.length; i++) {
    if (specialChars.includes(str[i])) {
      return true;
    }
  }
  return false;
};

/**
 * Normalizes special characters to their ASCII equivalents
 * @param str - The string to normalize
 * @param exclude - Optional set of characters to exclude from normalization
 * @returns The normalized string with special characters replaced
 * @example
 * normalize("café") // returns "cafe"
 * normalize("naïve") // returns "naive"
 * normalize("Zürich") // returns "Zurich"
 */
export const normalize = (str: string, exclude?: Set<string>): string => {
  const chars = str.split("");
  const newStr = chars
    .map((char) => {
      // Skip normalization for excluded characters
      if (exclude && exclude.has(char)) {
        return char;
      }
      
      if (!char.match(/([a-zA-Z0-9 -])/g)) {
        const replaceChar = (
          Object.keys(specialCharacters).find(
            (key) => specialCharacters[key].indexOf(char.toLowerCase()) > -1
          ) || "_"

        );
        return isUpperCase(char) ? replaceChar.toUpperCase() : replaceChar;
      }
      return char;
    })
    .join("");

  return newStr;
};
/**
 * Converts a string to PascalCase (UpperCamelCase)
 * @param str - The string to convert
 * @param options - Optional configuration
 * @param options.exclude - Array of characters to exclude from transformation
 * @returns The string in PascalCase format
 * @example
 * PascalCase("hello world") // returns "HelloWorld"
 * PascalCase("hello-world") // returns "HelloWorld"
 * PascalCase("hello_world") // returns "HelloWorld"
 */
export const PascalCase = (str: string, options: Options = {}): string => {
  if (!str) return "";
  
  // Normalize with exclusions
  const excludeSet = options.exclude ? new Set(options.exclude) : undefined;
  const processStr = normalize(str, excludeSet);
  
  // If we have exclusions, handle them specially
  if (options.exclude && options.exclude.length > 0) {
    // Split the original string by word boundaries (spaces, underscores, hyphens)
    const words = str.split(/[-_\s]+/);
    let result = "";
    
    for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
      const word = words[wordIndex];
      if (!word) continue;
      
      // For each word, handle excluded characters
      let currentPart = "";
      let isNewWord = result === "" || wordIndex > 0; // First word or after word boundary
      
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        
        if (excludeSet!.has(char)) {
          // Finish current part
          if (currentPart) {
            const normalized = normalize(currentPart, excludeSet);
            result += isNewWord ? normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase() : normalized.toLowerCase();
            currentPart = "";
          }
          result += char;
          // Check if this excluded character is a letter/accent (should not capitalize next part)
          // vs a separator character (should capitalize next part)
          const isLetterChar = /[a-zA-ZÀ-ÿ]/i.test(char);
          isNewWord = !isLetterChar; // Only capitalize after non-letter excluded chars
        } else {
          currentPart += char;
        }
      }
      
      // Handle last part of the word
      if (currentPart) {
        const normalized = normalize(currentPart, excludeSet);
        result += isNewWord ? normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase() : normalized.toLowerCase();
      }
    }
    
    return result;
  }
  
  // Standard behavior without exclusions
  const Az09 = `A-Za-z0-9`;
  const a1 = `^[^${Az09}]*|[^${Az09}]*$`;
  const a2 = new RegExp(a1, "g");
  const b1 = `[^${Az09}]+`;
  const b2 = new RegExp(b1, "g");
  
  return String(processStr)
    .replace(a2, "$")
    .replace(b2, "$")
    .replace(/([a-z])([A-Z])/g, (m, a, b) => a + "$" + b)
    .toLowerCase()
    .replace(/(\$)(\w?)/g, (m, a, b) => b.toUpperCase());
};

/**
 * Alias for PascalCase function
 * @see {@link PascalCase}
 */
export const pascalCase = PascalCase;

/**
 * Converts a string to camelCase
 * @param str - The string to convert
 * @param options - Optional configuration
 * @param options.exclude - Array of characters to exclude from transformation
 * @returns The string in camelCase format
 * @example
 * camelCase("hello world") // returns "helloWorld"
 * camelCase("Hello World") // returns "helloWorld"
 * camelCase("hello-world") // returns "helloWorld"
 */
export const camelCase = (str: string, options: Options = {}): string => {
  if (!str) return "";
  
  // Use PascalCase and then lowercase the first letter
  const pascalStr = PascalCase(str, options);
  return pascalStr.charAt(0).toLowerCase() + pascalStr.substring(1);
};

/**
 * Converts a string to kebab-case (lowercase with hyphens)
 * @param str - The string to convert
 * @param options - Optional configuration
 * @param options.exclude - Array of characters to exclude from transformation
 * @returns The string in kebab-case format
 * @example
 * kebabCase("HelloWorld") // returns "hello-world"
 * kebabCase("helloWorld") // returns "hello-world"
 * kebabCase("hello world") // returns "hello-world"
 */
export const kebabCase = (str: string = "", options: Options = {}): string => {
  if (!str) return "";
  
  // Normalize with exclusions
  const excludeSet = options.exclude ? new Set(options.exclude) : undefined;
  const processStr = normalize(str, excludeSet);
  
  // First, handle snake_case and kebab-case inputs by replacing separators with spaces
  let result = processStr.replace(/[-_]/g, ' ');
  
  // Handle camelCase and PascalCase by inserting spaces before uppercase letters
  result = result.replace(/([a-z])([A-Z])/g, '$1 $2');
  
  // For sequences of uppercase letters followed by numbers, keep them together
  // But split sequences of uppercase letters when followed by lowercase (e.g., XMLHttp -> XML Http)
  result = result.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
  
  if (options.exclude && options.exclude.length > 0) {
    // For excluded characters, we need to handle the original string differently
    // to preserve word boundaries marked by underscores
    const originalWords = str.split(/[-_\s]+/);
    const allParts: string[] = [];
    
    for (let wordIndex = 0; wordIndex < originalWords.length; wordIndex++) {
      const word = originalWords[wordIndex];
      if (!word) continue;
      
      // Add separator between words (but not before first word)
      if (wordIndex > 0) {
        allParts.push('-'); // This will be our word separator
      }
      
      // Split each word by excluded characters
      let currentPart = "";
      
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (excludeSet!.has(char)) {
          if (currentPart) {
            const normalized = normalize(currentPart, excludeSet);
            allParts.push(normalized.toLowerCase());
            currentPart = "";
          }
          allParts.push(char);
        } else {
          currentPart += char;
        }
      }
      if (currentPart) {
        const normalized = normalize(currentPart, excludeSet);
        allParts.push(normalized.toLowerCase());
      }
    }
    
    // Join all parts without adding extra separators
    return allParts.join('');
  }
  
  // Don't split numbers from letters - keep them together
  // Standard behavior: split by spaces, filter empty strings, lowercase and join with hyphens
  return result.split(' ')
    .filter(word => word.length > 0)
    .map(word => word.toLowerCase())
    .join('-');
};

/**
 * Converts a camelCase string directly to snake_case
 * @param str - The camelCase string to convert
 * @returns The string in snake_case format
 * @example
 * camelToSnakeCase("helloWorld") // returns "hello_world"
 * camelToSnakeCase("myVariableName") // returns "my_variable_name"
 */
export const camelToSnakeCase = (str: string): string => {
  if (!str) return "";
  var result = str.replace(/([A-Z])/g, " $1");
  return result.trim().split(" ").join("_").toLowerCase();
};
/**
 * Converts a camelCase string directly to slug-case (kebab-case)
 * @param str - The camelCase string to convert
 * @returns The string in slug-case format
 * @example
 * camelToSlugCase("helloWorld") // returns "hello-world"
 * camelToSlugCase("myVariableName") // returns "my-variable-name"
 */
export const camelToSlugCase = (str: string): string => {
  if (!str) return "";
  var result = str.replace(/([A-Z])/g, " $1");
  return result.trim().split(" ").join("-").toLowerCase();
};

/**
 * Converts a string to snake_case (lowercase with underscores)
 * @param str - The string to convert
 * @param options - Optional configuration
 * @param options.exclude - Array of characters to exclude from transformation
 * @returns The string in snake_case format
 * @example
 * snakeCase("HelloWorld") // returns "hello_world"
 * snakeCase("hello world") // returns "hello_world"
 * snakeCase("hello-world") // returns "hello_world"
 */
export const snakeCase = (str: string, options: Options = {}): string => {
  if (!str) return "";
  
  // Convert to kebab-case first (handles exclusions), then replace hyphens with underscores
  const kebabStr = kebabCase(str, options);
  return kebabStr.replace(/-/g, '_');
};

/**
 * Converts a string to UPPER_SNAKE_CASE (uppercase with underscores)
 * @param str - The string to convert
 * @param options - Optional configuration
 * @param options.exclude - Array of characters to exclude from transformation
 * @returns The string in UPPER_SNAKE_CASE format
 * @example
 * upperSnakeCase("HelloWorld") // returns "HELLO_WORLD"
 * upperSnakeCase("hello world") // returns "HELLO_WORLD"
 * upperSnakeCase("hello-world") // returns "HELLO_WORLD"
 */
export const upperSnakeCase = (str: string, options: Options = {}): string => {
  if (!str) return "";
  
  if (!options.exclude || options.exclude.length === 0) {
    // Standard behavior
    return snakeCase(str, options).toUpperCase();
  }
  
  // With exclusions, convert to snake_case but preserve excluded chars (just uppercase them)
  const excludeSet = new Set(options.exclude);
  const snakeResult = snakeCase(str, options);
  let result = "";
  
  for (let i = 0; i < snakeResult.length; i++) {
    const char = snakeResult[i];
    if (excludeSet.has(char) || excludeSet.has(char.toLowerCase())) {
      // Keep excluded character but uppercase it
      result += char.toUpperCase();
    } else {
      result += char.toUpperCase();
    }
  }
  
  return result;
};

/**
 * Converts a string to slug-case (alias for kebab-case)
 * @param str - The string to convert
 * @param options - Optional configuration
 * @param options.exclude - Array of characters to exclude from transformation
 * @returns The string in slug-case format
 * @example
 * slugCase("Hello World!") // returns "hello-world"
 * slugCase("HelloWorld") // returns "hello-world"
 */
export const slugCase = (str: string, options: Options = {}): string => {
  if (!str) return "";
  
  // slug-case is the same as kebab-case
  return kebabCase(str, options);
};

/**
 * Converts a string to CONSTANT_CASE (UPPER_SNAKE_CASE with number prefix handling)
 * @param str - The string to convert
 * @param options - Optional configuration
 * @param options.exclude - Array of characters to exclude from transformation
 * @param options.startChar - Character to prepend if string starts with a number (default: "_")
 * @returns The string in CONSTANT_CASE format
 * @example
 * constCase("myVariable") // returns "MY_VARIABLE"
 * constCase("123 variable") // returns "_123_VARIABLE"
 * constCase("123 variable", { startChar: "$" }) // returns "$123_VARIABLE"
 */
export const constCase = (str: string, options: Options = {}): string => {
  if (!str) return "";
  const startChar = options.startChar || "_";
  let newStr = upperSnakeCase(str, options);

  // Only add prefix if the first character is a number AND we don't have exclusions
  if(!isNaN(parseInt(newStr.charAt(0))) && (!options.exclude || options.exclude.length === 0)) {
		return `${startChar}${newStr}`;
	}
	return newStr;
}

/**
 * Converts a string to sentence case (first letter capitalized, rest lowercase)
 * @param str - The string to convert
 * @param options - Optional configuration
 * @param options.exclude - Array of characters to exclude from transformation
 * @returns The string in sentence case format
 * @example
 * sentenceCase("HELLO_WORLD") // returns "Hello world"
 * sentenceCase("helloWorld") // returns "Hello world"
 * sentenceCase("hello-world") // returns "Hello world"
 */
export const sentenceCase = (str: string, options: Options = {}): string => {
  if (!str || !str.trim()) return "";
  
  // Only normalize if no exclusions are specified
  const processStr = options.exclude ? str : normalize(str);
  
  // Insert spaces before uppercase letters in the middle of the string
  let result = processStr.replace(/([a-z])([A-Z])/g, '$1 $2');
  
  // Trim the string
  result = result.trim();
  
  // If the result is empty after trimming, return empty string
  if (!result) return "";
  
  // Replace underscores and dashes with spaces, and convert to lowercase
  result = result.replace(/[-_]/g, " ").toLowerCase();
  
  // Convert only the first character of the entire string to uppercase
  return result.replace(/^./, (firstChar) => firstChar.toUpperCase());
}