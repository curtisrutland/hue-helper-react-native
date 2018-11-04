export default function createNamespace(ns: string) {
  return function (strings: TemplateStringsArray) {
    return `@@${ns}/${strings.join("")}`;
  };
}