import { PartialWithId } from '../../../shared/domain/partial-with-id';
import { Template } from '../entity/template';

export interface TemplateRepository {
  list: () => Promise<Template[]>;
  findById: (id: string) => Promise<Template | null>;
  create: (template: Template) => Promise<void>;
  update: (template: PartialWithId<Template>) => Promise<Template | null>;
  delete: (id: string) => Promise<Template | null>;
}
