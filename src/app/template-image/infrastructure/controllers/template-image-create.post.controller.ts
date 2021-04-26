import { Body, Controller, Inject, Post } from '../../../../core';
import { CreateTemplateImageDto } from '../../application/dto/create-template-image.dto';
import { TemplateImageCreate } from '../../application/template-image-create';
import { TEMPLATE_IMAGE_CONTROLLER_PATH, TEMPLATE_IMAGE_CREATE } from '../../constants';

@Controller(TEMPLATE_IMAGE_CONTROLLER_PATH)
export class TemplateImageCreatePostController {
  constructor(
    @Inject(TEMPLATE_IMAGE_CREATE)
    private readonly templateImageCreate: TemplateImageCreate
  ) {}

  @Post()
  post(@Body() createTemplateImageDto: CreateTemplateImageDto) {
    this.templateImageCreate.create(createTemplateImageDto);
  }
}
