import { UpdateQuery } from 'mongoose';
import { PaperFormat } from '../../../shared/domain/paper-format';
import { PartialWithId } from '../../../shared/domain/partial-with-id';
import templateImage from '../../../template-image';
import { Template } from '../../domain/entity/template';
import { TemplateModel } from './template-model';

export class TemplateModelEntityMapper {
  static fromTemplateToTemplateModel(template: Template): TemplateModel {
    return {
      id: template.id,
      name: template.name,
      html: template.html,
      header: template.header,
      footer: template.footer,
      paperFormat: template.paperFormat,
    } as TemplateModel;
  }

  static fromPartialTemplateToUpdateQuery(
    template: PartialWithId<Template>
  ): UpdateQuery<TemplateModel> {
    const queryWithId = {
      id: template.id,
    };
    const query: UpdateQuery<TemplateModel> = Object.keys(template)
      .reduce((updateQuery: UpdateQuery<TemplateModel>, key: string) => {
        if (template[key as keyof Template] !== undefined)
          return {
            ...updateQuery,
            [key]: template[key as keyof Template],
          };

        return updateQuery;
      }, queryWithId);

    return query;
  }

  static fromTemplateModelToTemplate(
    template: TemplateModel | null
  ): Template | null {
    if (!template) return template;

    return Template.create(
      template.id,
      template.name,
      template.html,
      template.header,
      template.footer,
      template.paperFormat as PaperFormat,
      template.templateImages
    );
  }
}
