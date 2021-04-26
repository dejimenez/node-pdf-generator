import { Inject, Injectable } from '../../../../core';
import {
  MAX_EXPIRATION_TIME_IN_DAYS,
  TEMPLATE_IMAGE_REPOSITORY,
  TEMPLATE_IMAGE_STORAGE_SERVICE,
  URL_EXPIRATION_TIME_RENOVATION,
} from '../../constants';
import { TemplateImage } from '../entity/template-image';
import { TemplateImageRepository } from '../repository/template-image.repository';
import { TemplateImageStorageService } from './template-image-storage.service';

@Injectable()
export class TemplateImageWithValidUrlService {
  constructor(
    @Inject(TEMPLATE_IMAGE_STORAGE_SERVICE)
    private readonly templateImageStorageService: TemplateImageStorageService,
    @Inject(TEMPLATE_IMAGE_REPOSITORY)
    private readonly templateImageRepository: TemplateImageRepository
  ) {}

  async getTemplateImageWithValidUrl(
    templateImage: TemplateImage
  ): Promise<TemplateImage> {
    if (templateImage.expiration > Date.now() + URL_EXPIRATION_TIME_RENOVATION)
      return templateImage;

    return await this.getTemplateImageWithUrlAndExpiration(templateImage);
  }

  private async getTemplateImageWithUrlAndExpiration(
    templateImage: TemplateImage
  ): Promise<TemplateImage> {
    const now = Date.now();
    const expiration =
      now + MAX_EXPIRATION_TIME_IN_DAYS * URL_EXPIRATION_TIME_RENOVATION;
    const url = await this.templateImageStorageService.getImagePublicUrl(
      templateImage,
      expiration
    );

    return TemplateImage.create(
      templateImage.id,
      templateImage.name,
      templateImage.path,
      url,
      expiration
    );
  }

  async updateTemplateImageWithUrlAndExpiration(
    templateImage: TemplateImage
  ): Promise<TemplateImage> {
    if (templateImage.expiration > Date.now() + URL_EXPIRATION_TIME_RENOVATION)
      return templateImage;

    const templateImageToUpdate = await this.getTemplateImageWithUrlAndExpiration(
      templateImage
    );
    const templateImageUpdated = await this.templateImageRepository.update(
      templateImageToUpdate
    );

    if (!templateImageUpdated) throw new Error('Template image not found');

    return templateImageUpdated;
  }
}
