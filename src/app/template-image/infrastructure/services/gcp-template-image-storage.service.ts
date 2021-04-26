import { Bucket, Storage } from '@google-cloud/storage';
import { ConfigService, CONFIG_SERVICE, Inject, Injectable } from '../../../../core';
import { TemplateImage } from '../../domain/entity/template-image';
import { TemplateImageStorageService } from '../../domain/services/template-image-storage.service';

@Injectable()
export class GcpTemplateImageStorageService
  implements TemplateImageStorageService {
  private storage: Storage;
  private bucket: Bucket;

  constructor(@Inject(CONFIG_SERVICE) configService: ConfigService) {
    this.storage = new Storage({
      credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL!,
        private_key: process.env.GCP_PRIVATE_KEY!,
      },
    });
    this.bucket = this.storage.bucket(configService.get('GCP_BUCKET'));
  }

  async getImagePublicUrl(
    templateImage: TemplateImage,
    expires: number
  ): Promise<string> {
    const [url] = await this.bucket.file(templateImage.path).getSignedUrl({
      version: 'v4',
      action: 'read',
      expires,
    });

    return url;
  }

  async getUploadUrl(
    fileName: string,
    contentType: string,
    expires: number
  ): Promise<string> {
    const [url] = await this.bucket.file(fileName).getSignedUrl({
      version: 'v4',
      action: 'write',
      contentType: contentType,
      expires,
    });

    return url;
  }

  async removeImage(templateImage: TemplateImage): Promise<void> {
    await this.bucket.file(templateImage.path).delete();
  }
}
