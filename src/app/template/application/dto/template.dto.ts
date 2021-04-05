export class TemplateDto {
  id: string;
  name: string;
  html: string;

  constructor(id: string, name: string, html: string) {
    this.id = id;
    this.name = name;
    this.html = html;
  }
}
