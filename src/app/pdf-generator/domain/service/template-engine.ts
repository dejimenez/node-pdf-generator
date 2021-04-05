export interface TemplateEngine {
  build: (html: string, data: any) => string;
}
