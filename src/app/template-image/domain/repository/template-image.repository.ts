import { PartialWithId } from '../../../shared/domain/partial-with-id';
import { TemplateImage } from '../entity/template-image';

export interface TemplateImageRepository {
  list: () => Promise<TemplateImage[]>;
  findAll: (ids: string[]) => Promise<TemplateImage[]>;
  findById: (id: string) => Promise<TemplateImage | null>;
  create: (templateImage: TemplateImage) => Promise<void>;
  update: (
    templateImage: PartialWithId<TemplateImage>
  ) => Promise<TemplateImage | null>;
  remove: (id: string) => Promise<TemplateImage | null>;
}
