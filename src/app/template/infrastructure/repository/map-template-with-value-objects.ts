import { PaperFormat } from '../../../shared/domain/paper-format';
import { TemplateWithValueObjects } from '../../domain/entity/template-with-value-objects';
import { TemplateModel } from './template-model';

export const fromTemplateToTemplateModel = (
  template: TemplateWithValueObjects
): TemplateModel => {
  return {
    id: template.id.getValue(),
    name: template.name.getValue(),
    html: template.html.getValue(),
    paperFormat: template.paperFormat,
  } as TemplateModel;
};

export const fromTemplateModelToTemplate = (
  template: TemplateModel
): TemplateWithValueObjects => {
  return TemplateWithValueObjects.create(
    template.id,
    template.name,
    template.html,
    template.paperFormat as PaperFormat
  );
};
