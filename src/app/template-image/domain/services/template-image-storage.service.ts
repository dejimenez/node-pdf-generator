import { TemplateImage } from '../entity/template-image';

export interface TemplateImageStorageService {
  getImagePublicUrl: (
    templateImage: TemplateImage,
    expires: number
  ) => Promise<string>;
  getUploadUrl: (
    fileName: string,
    contentType: string,
    expires: number
  ) => Promise<string>;
  removeImage: (templateImage: TemplateImage) => Promise<void>;
}
