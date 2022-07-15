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
