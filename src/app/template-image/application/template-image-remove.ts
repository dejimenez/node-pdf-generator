import { Inject, Injectable } from '../../../core';
import {
  TEMPLATE_IMAGE_REPOSITORY,
  TEMPLATE_IMAGE_STORAGE_SERVICE,
} from '../constants';
import { TemplateImageRepository } from '../domain/repository/template-image.repository';
import { TemplateImageStorageService } from '../domain/services/template-image-storage.service';

@Injectable()
export class TemplateImageRemove {
  constructor(
    @Inject(TEMPLATE_IMAGE_REPOSITORY)
    private readonly templateImageRepository: TemplateImageRepository,
    @Inject(TEMPLATE_IMAGE_STORAGE_SERVICE)
    private readonly templateImageStorageService: TemplateImageStorageService
  ) {}

  async remove(id: string): Promise<void> {
    const templateImage = await this.templateImageRepository.remove(id);

    if (!templateImage) throw new Error('Image not found');

    await this.templateImageStorageService.removeImage(templateImage);
  }
}
