import { PaperFormat } from '../../../shared/domain/paper-format';
import { TemplateHtml } from '../value-objects/template-html';
import { TemplateId } from '../value-objects/template-id';
import { TemplateName } from '../value-objects/template-name';

export class TemplateWithValueObjects {
  id: TemplateId;
  name: TemplateName;
  html: TemplateHtml;
  paperFormat: PaperFormat;

  private constructor(
    id: TemplateId,
    name: TemplateName,
    html: TemplateHtml,
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
    const templateId = new TemplateId(id);
    const templateName = new TemplateName(name);
    const templateHtml = new TemplateHtml(html);
    return new TemplateWithValueObjects(
      templateId,
      templateName,
      templateHtml,
      paperFormat
    );
  }
}
