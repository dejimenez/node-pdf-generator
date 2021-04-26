import { Controller, Get, Inject } from '../../../../core';
import { TemplateImageList } from '../../application/template-image-list';
import { TEMPLATE_IMAGE_CONTROLLER_PATH, TEMPLATE_IMAGE_LIST } from '../../constants';

@Controller(TEMPLATE_IMAGE_CONTROLLER_PATH)
export class TemplateImageListGetController {
  constructor(
    @Inject(TEMPLATE_IMAGE_LIST)
    private readonly templateImageList: TemplateImageList
  ) {}

  @Get()
  get() {
    return this.templateImageList.list();
  }
}
