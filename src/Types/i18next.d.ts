import Resources from "../Lang/Resources"
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS?: string | false | readonly string[];
    resources: typeof Resources;
  }
}