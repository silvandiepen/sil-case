import { specialCharacters } from "./data";

interface Options {
  exclude?: string[];
}

export const isUpperCase = (char: string): boolean => {
  return char === char.toUpperCase();
};

export const containsSpecialCharacters = (str: string): boolean => {
  const specialChars = Object.values(specialCharacters).flat();
  for (let i = 0; i < str.length; i++) {
    if (specialChars.includes(str[i])) {
      return true;
    }
  }
  return false;
};

export const normalize = (str: string): string => {
  const chars = str.split("");
  const newStr = chars
    .map((char) => {
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
export const PascalCase = (str: string, options: Options = {}): string => {
  if (!str) return "";
  const exclude = options.exclude ? options.exclude.join("") : ``;
  const Az09 = `A-Za-z0-9${exclude}`;

  const a1 = `^[^${Az09}]*|[^${Az09}]*$`;
  const a2 = new RegExp(a1, "g");

  const b1 = `[^${Az09}]+`;
  const b2 = new RegExp(b1, "g");

  return String(str)
    .replace(a2, "$")
    .replace(b2, "$")
    .replace(/([a-z])([A-Z])/g, (m, a, b) => a + "$" + b)
    .toLowerCase()
    .replace(/(\$)(\w?)/g, (m, a, b) => b.toUpperCase());
};

export const pascalCase = PascalCase;

export const camelCase = (str: string, options: Options = {}): string => {
  if (!str) return "";
  const exclude = options.exclude ? options.exclude.join("") : ``;
  const Az09 = `A-Za-z0-9${exclude}`;

  const a1 = `^[^${Az09}]*|[^${Az09}]*$`;
  const a2 = new RegExp(a1, "g");

  const b1 = `[^${Az09}]+`;
  const b2 = new RegExp(b1, "g");
  4;
  const newStr = String(str)
    .replace(a2, "$")
    .replace(b2, "$")
    .replace(/([a-z])([A-Z])/g, (m, a, b) => a + "$" + b)
    .toLowerCase()
    .replace(/(\$)(\w?)/g, (m, a, b) => b.toUpperCase());
  return newStr.charAt(0).toLowerCase() + newStr.substring(1);
};

export const kebabCase = (str: string = ""): string => {
  if (!str) return "";
  const matches = str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
  );
  return matches ? matches.map((x) => x.toLowerCase()).join("-") : "";
};

export const camelToSnakeCase = (str: string): string => {
  if (!str) return "";
  var result = str.replace(/([A-Z])/g, " $1");
  return result.split(" ").join("_").toLowerCase();
};
export const camelToSlugCase = (str: string): string => {
  if (!str) return "";
  var result = str.replace(/([A-Z])/g, " $1");
  return result.split(" ").join("-").toLowerCase();
};

export const snakeCase = (str: string): string => {
  if (!str) return "";
  return camelToSnakeCase(camelCase(str));
};

export const upperSnakeCase = (str: string): string => {
  if (!str) return "";
  return camelToSnakeCase(camelCase(str)).toUpperCase();
};

export const slugCase = (str: string): string => {
  if (!str) return "";
  return camelToSlugCase(camelCase(str));
};

export const constCase = (str: string, startChar: string = "_" ): string => {
  if (!str) return "";
  let newStr = upperSnakeCase(str);
      
  if(!isNaN(parseInt(newStr.charAt(0)))) {
		return `${startChar}${newStr}`;
	}
	return newStr;

}