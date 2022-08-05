export const PascalCase = (str: string): string => {
  if (!str) return "";
  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "$")
    .replace(/[^A-Za-z0-9]+/g, "$")
    .replace(/([a-z])([A-Z])/g, (m, a, b) => a + "$" + b)
    .toLowerCase()
    .replace(/(\$)(\w?)/g, (m, a, b) => b.toUpperCase());
};

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
