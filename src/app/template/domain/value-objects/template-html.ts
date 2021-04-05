export class TemplateHtml {
  private readonly html: string;

  constructor(html: string) {
    this.html = html;
  }

  getValue(): string {
    return this.html;
  }
}
