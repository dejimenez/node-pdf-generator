import {
  ConfigService,
  CONFIG_SERVICE,
  Inject,
  Injectable,
} from '../../../core';
import {
  TEMPLATE_IMAGE_REPOSITORY,
  TEMPLATE_IMAGE_WITH_VALID_URL,
} from '../constants';
import { TemplateImage } from '../domain/entity/template-image';
import { TemplateImageRepository } from '../domain/repository/template-image.repository';
import { TemplateImageStorageService } from '../domain/services/template-image-storage.service';
import { TemplateImageWithValidUrlService } from '../domain/services/template-image-with-valid-url.service';
import { CreateTemplateImageDto } from './dto/create-template-image.dto';
import { TemplateImageMap } from './dto/template-image-map';

@Injectable()
export class TemplateImageCreate {
  constructor(
    @Inject(TEMPLATE_IMAGE_REPOSITORY)
    private readonly templateImageRepository: TemplateImageRepository,
    @Inject(CONFIG_SERVICE)
    private readonly configService: ConfigService,
    @Inject(TEMPLATE_IMAGE_WITH_VALID_URL)
    private readonly templateImageWithValidUrl: TemplateImageWithValidUrlService
  ) {}

  async create(createTemplateImageDto: CreateTemplateImageDto): Promise<void> {
    const templateImageWithPublicUrlAndExpiration = await this.getTemplateImageWithUrlAndExpiration(
      createTemplateImageDto
    );

    await this.templateImageRepository.create(
      templateImageWithPublicUrlAndExpiration
    );
  }

  private async getTemplateImageWithUrlAndExpiration(
    templateImage: CreateTemplateImageDto
  ): Promise<TemplateImage> {
    const path =
      this.configService.get('IMAGE_PATH') + '/' + templateImage.name;

    return await this.templateImageWithValidUrl.getTemplateImageWithValidUrl({
      ...TemplateImageMap.toTemplateImage(templateImage),
      path,
});
  }
}
