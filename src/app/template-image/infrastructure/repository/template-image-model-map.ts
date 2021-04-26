import { TemplateImage } from '../../domain/entity/template-image';
import { TemplateImageModel } from './template-image.model';

export class TemplateImageModelMap {
  static toTemplateImage(
    templateImageModel: TemplateImageModel | null
  ): TemplateImage | null {
    if (!templateImageModel) return null;

    const name = templateImageModel.path.split('/').pop() || '';

    return TemplateImage.create(
      templateImageModel.id,
      name,
      templateImageModel.path,
      templateImageModel.url,
      templateImageModel.expiration
    );
  }
}
