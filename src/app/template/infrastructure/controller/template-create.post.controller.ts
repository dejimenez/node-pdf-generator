import { Controller, Post, Body, Inject } from '../../../../core';
import { TemplateCreate } from '../../application/template-create';
import { TEMPLATE_CONTROLLER_PATH, TEMPLATE_CREATE } from '../../constants';
import { Template } from '../../domain/entity/template';

@Controller(TEMPLATE_CONTROLLER_PATH)
export class TemplateCreatePostController {
  constructor(
    @Inject(TEMPLATE_CREATE) private readonly templateCreate: TemplateCreate
  ) {}

  @Post()
  post(@Body() template: Template): Promise<void> {
    return this.templateCreate.create(template);
  }
}
