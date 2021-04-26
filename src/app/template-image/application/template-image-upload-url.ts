import {
  ConfigService,
  CONFIG_SERVICE,
  Inject,
  Injectable,
} from '../../../core';
import { TEMPLATE_IMAGE_STORAGE_SERVICE } from '../constants';
import { TemplateImageStorageService } from '../domain/services/template-image-storage.service';
import { FileInfoDto } from './dto/file-info.dto';

@Injectable()
export class TemplateImageUploadUrl {
  constructor(
    @Inject(TEMPLATE_IMAGE_STORAGE_SERVICE)
    private readonly templateImageStorageService: TemplateImageStorageService,
    @Inject(CONFIG_SERVICE) private readonly configService: ConfigService
  ) {}

  getUrl(fileInfo: FileInfoDto) {
    const expirationInMinutes = Number(
      this.configService.get('UPLOAD_URL_EXPIRATION_TIME_MINUTES')
    );
    const expiration = Date.now() + expirationInMinutes * 60 * 1000;
    const path = this.configService.get('IMAGE_PATH') + '/' + fileInfo.fileName;

    return this.templateImageStorageService.getUploadUrl(
      path,
      fileInfo.contentType,
      expiration
    );
  }
}
