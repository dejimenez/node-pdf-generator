import { PaperFormat } from '../../../shared/domain/paper-format';
import { TemplateImage } from '../../../template-image/domain/entity/template-image';

export class TemplateDto {
  id: string;
  name: string;
  html: string;
  header: string;
  footer: string;
  paperFormat: PaperFormat;
  templateImages: (TemplateImage | string)[];

  constructor(
    id: string,
    name: string,
    html: string,
    header: string = '',
    footer: string = '',
    paperFormat: PaperFormat = PaperFormat.A4,
    templateImages: (TemplateImage | string)[] = []
  ) {
    this.id = id;
    this.name = name;
    this.html = html;
    this.header = header;
    this.footer = footer;
    this.paperFormat = paperFormat;
    this.templateImages = templateImages;
  }
}
