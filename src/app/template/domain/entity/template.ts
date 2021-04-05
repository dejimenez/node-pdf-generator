import { PaperFormat } from '../../../shared/domain/paper-format';

export class Template {
  id: string;
  name: string;
  html: string;
  paperFormat: PaperFormat;

  private constructor(
    id: string,
    name: string,
    html: string,
    paperFormat: PaperFormat
  ) {
    this.id = id;
    this.name = name;
    this.html = html;
    this.paperFormat = paperFormat;
  }

  static create(
    id: string,
    name: string,
    html: string,
    paperFormat: PaperFormat = PaperFormat.A4
  ) {
    return new Template(id, name, html, paperFormat);
  }
}
