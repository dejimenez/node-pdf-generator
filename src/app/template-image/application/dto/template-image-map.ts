import { TemplateImage } from '../../domain/entity/template-image';
import { CreateTemplateImageDto } from './create-template-image.dto';
import { TemplateImageDto } from './template-image.dto';

export class TemplateImageMap {
  static toTemplateImage(
    createTemplateImageDto: CreateTemplateImageDto
  ): TemplateImage {
    return TemplateImage.create(
      createTemplateImageDto.id,
      createTemplateImageDto.name
    );
  }

  static toTemplateImageDto(templateImage: TemplateImage) {
    return new TemplateImageDto(
      templateImage.id,
      templateImage.name,
      templateImage.path,
      templateImage.url
    );
  }
}
