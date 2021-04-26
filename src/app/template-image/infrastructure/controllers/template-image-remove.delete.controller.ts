import { Controller, Delete, Inject, Param } from '../../../../core';
import { TemplateImageRemove } from '../../application/template-image-remove';
import {
  TEMPLATE_IMAGE_CONTROLLER_PATH,
  TEMPLATE_IMAGE_REMOVE,
} from '../../constants';

@Controller(TEMPLATE_IMAGE_CONTROLLER_PATH)
export class TemplateImageRemoveDeleteController {
  constructor(
    @Inject(TEMPLATE_IMAGE_REMOVE)
    private readonly templateImageRemove: TemplateImageRemove
  ) {}

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.templateImageRemove.remove(id);
  }
}
