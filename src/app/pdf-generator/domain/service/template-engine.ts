export interface TemplateEngine {
  build: (html: string, data: object) => string;
}
