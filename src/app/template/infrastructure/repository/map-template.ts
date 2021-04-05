import { UpdateQuery } from 'mongoose';
import { PaperFormat } from '../../../shared/domain/paper-format';
import { PartialWithId } from '../../../shared/domain/partial-with-id';
import { Template } from '../../domain/entity/template';
import { TemplateModel } from './template-model';

export const fromTemplateToTemplateModel = (
  template: Template
): TemplateModel => {
  return {
    id: template.id,
    name: template.name,
    html: template.html,
    paperFormat: template.paperFormat,
  } as TemplateModel;
};

export const fromPartialTemplateToUpdateQuery = (
  template: PartialWithId<Template>
): UpdateQuery<Template> => {
  const query: UpdateQuery<Template> = {
    id: template.id,
  };

  return Object.keys(template).reduce(
    (updateQuery: UpdateQuery<Template>, key: string) => {
      if (template[key as keyof Template] !== undefined)
        return { ...updateQuery, [key]: template[key as keyof Template] };
      return updateQuery;
    },
    query
  );
};

export const fromTemplateModelToTemplate = (
  template: TemplateModel
): Template => {
  return Template.create(
    template.id,
    template.name,
    template.html,
    template.paperFormat as PaperFormat
  );
};
