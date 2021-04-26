import { Inject, Injectable } from '../../../core';
import {
  TEMPLATE_IMAGE_REPOSITORY,
  TEMPLATE_IMAGE_WITH_VALID_URL,
} from '../constants';
import { TemplateImage } from '../domain/entity/template-image';
import { TemplateImageRepository } from '../domain/repository/template-image.repository';
import { TemplateImageWithValidUrlService } from '../domain/services/template-image-with-valid-url.service';
import { TemplateImageDto } from './dto/template-image.dto';

@Injectable()
export class TemplateImageList {
  constructor(
    @Inject(TEMPLATE_IMAGE_REPOSITORY)
    private readonly templateImageRepository: TemplateImageRepository,
    @Inject(TEMPLATE_IMAGE_WITH_VALID_URL)
    private readonly templateImageWithValidUrl: TemplateImageWithValidUrlService
  ) {}

  async list(): Promise<TemplateImageDto[]> {
    const templateImages = await this.templateImageRepository.list();

    return this.mapToTemplateImagesWithValidUrls(templateImages);
  }

  private mapToTemplateImagesWithValidUrls(
    templateImages: TemplateImage[]
  ): TemplateImageDto[] | PromiseLike<TemplateImageDto[]> {
    return Promise.all(
      templateImages.map((templateImage: TemplateImage) =>
        this.templateImageWithValidUrl.updateTemplateImageWithUrlAndExpiration(
          templateImage
        )
      )
    );
  }
}
