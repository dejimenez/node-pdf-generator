import { Controller, Get, Inject, Param } from '../../../../core';
import { TemplateDto } from '../../application/dto/template.dto';
import { TemplateFindById } from '../../application/template-find-by-id';
import { TEMPLATE_CONTROLLER_PATH, TEMPLATE_FIND_BY_ID } from '../../constants';

@Controller(TEMPLATE_CONTROLLER_PATH)
export class TemplateFindByIdGetController {
  constructor(
    @Inject(TEMPLATE_FIND_BY_ID)
    private readonly templateFindById: TemplateFindById
  ) {}

  @Get(':id')
  get(@Param('id') id: string): Promise<TemplateDto> {
    return this.templateFindById.find(id);
  }
}
