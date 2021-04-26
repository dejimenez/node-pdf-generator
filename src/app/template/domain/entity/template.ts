import { PaperFormat } from '../../../shared/domain/paper-format';

export class Template {
  id: string;
  name: string;
  html: string;
  header: string;
  footer: string;
  paperFormat: PaperFormat;
  templateImages: string[];

  private constructor(
    id: string,
    name: string,
    html: string,
    header: string,
    footer: string,
    paperFormat: PaperFormat,
    templateImages: string[]
  ) {
    this.id = id;
    this.name = name;
    this.html = html;
    this.header = header;
    this.footer = footer;
    this.paperFormat = paperFormat;
    this.templateImages = templateImages;
  }

  static create(
    id: string,
    name: string,
    html: string,
    header: string = '',
    footer: string = '',
    paperFormat: PaperFormat = PaperFormat.A4,
    templateImages: string[] = []
  ) {
    return new Template(
      id,
      name,
      html,
      header,
      footer,
      paperFormat,
      templateImages
    );
  }
}
