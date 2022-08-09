export const PascalCase = (str: string): string => {
  if (!str) return "";
  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "$")
    .replace(/[^A-Za-z0-9]+/g, "$")
    .replace(/([a-z])([A-Z])/g, (m, a, b) => a + "$" + b)
    .toLowerCase()
    .replace(/(\$)(\w?)/g, (m, a, b) => b.toUpperCase());
};

export const pascalCase = PascalCase;

export const camelCase = (str: string): string => {
  if (!str) return "";
  const newStr = String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "$")
    .replace(/[^A-Za-z0-9]+/g, "$")
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
