import { Controller, Get, Inject, Query } from '../../../../core';
import { FileInfoDto } from '../../application/dto/file-info.dto';
import { TemplateImageUploadUrl } from '../../application/template-image-upload-url';
import {
  TEMPLATE_IMAGE_CONTROLLER_PATH,
  TEMPLATE_IMAGE_UPLOAD_URL,
} from '../../constants';

@Controller(TEMPLATE_IMAGE_CONTROLLER_PATH)
export class TemplateImageUploadUrlGetController {
  constructor(
    @Inject(TEMPLATE_IMAGE_UPLOAD_URL)
    private readonly templateImageUploadUrl: TemplateImageUploadUrl
  ) {}

  @Get('/upload-url')
  get(@Query() fileInfo: FileInfoDto) {
    return this.templateImageUploadUrl.getUrl(fileInfo);
  }
}
