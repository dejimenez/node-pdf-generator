import { registerController, registerProvider } from '../../core';
import { TemplateImageCreate } from './application/template-image-create';
import { TemplateImageList } from './application/template-image-list';
import { TemplateImageRemove } from './application/template-image-remove';
import { TemplateImageUploadUrl } from './application/template-image-upload-url';
import {
  TEMPLATE_IMAGE_CREATE,
  TEMPLATE_IMAGE_LIST,
  TEMPLATE_IMAGE_REMOVE,
  TEMPLATE_IMAGE_REPOSITORY,
  TEMPLATE_IMAGE_STORAGE_SERVICE,
  TEMPLATE_IMAGE_UPLOAD_URL,
  TEMPLATE_IMAGE_WITH_VALID_URL,
} from './constants';
import { TemplateImageWithValidUrlService } from './domain/services/template-image-with-valid-url.service';
import { TemplateImageCreatePostController } from './infrastructure/controllers/template-image-create.post.controller';
import { TemplateImageListGetController } from './infrastructure/controllers/template-image-list.get.controller';
import { TemplateImageRemoveDeleteController } from './infrastructure/controllers/template-image-remove.delete.controller';
import { TemplateImageUploadUrlGetController } from './infrastructure/controllers/template-image-upload-url.get.controller';
import { MongooseTemplateImageRepository } from './infrastructure/repository/mongoose-template-image.repository';
import { GcpTemplateImageStorageService } from './infrastructure/services/gcp-template-image-storage.service';

export default () => {
  registerController(TemplateImageListGetController);
  registerController(TemplateImageCreatePostController);
  registerController(TemplateImageRemoveDeleteController);
  registerController(TemplateImageUploadUrlGetController);
  registerProvider(TEMPLATE_IMAGE_REPOSITORY, MongooseTemplateImageRepository);
  registerProvider(
    TEMPLATE_IMAGE_STORAGE_SERVICE,
    GcpTemplateImageStorageService
  );
  registerProvider(TEMPLATE_IMAGE_CREATE, TemplateImageCreate);
  registerProvider(TEMPLATE_IMAGE_LIST, TemplateImageList);
  registerProvider(TEMPLATE_IMAGE_REMOVE, TemplateImageRemove);
  registerProvider(TEMPLATE_IMAGE_UPLOAD_URL, TemplateImageUploadUrl);
  registerProvider(TEMPLATE_IMAGE_WITH_VALID_URL, TemplateImageWithValidUrlService);
};
