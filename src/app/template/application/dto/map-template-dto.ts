import { Template } from '../../domain/entity/template';
import { TemplateWithValueObjects } from '../../domain/entity/template-with-value-objects';
import { TemplateDto } from './template.dto';

export const fromTemplateToTemplateDto = (
  template: TemplateWithValueObjects
): TemplateDto => {
  return {
    id: template.id.getValue(),
    name: template.name.getValue(),
    html: template.html.getValue(),
  } as TemplateDto;
};

export const fromTemplateDtoToTemplate = (
  template: TemplateDto
): TemplateWithValueObjects => {
  return TemplateWithValueObjects.create(
    template.id,
    template.name,
    template.html
  );
};
