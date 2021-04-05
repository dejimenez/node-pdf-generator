import { Controller, Get, Inject } from '../../../../core';
import { TemplateDto } from '../../application/dto/template.dto';
import { TemplateList } from '../../application/template-list';
import { TEMPLATE_CONTROLLER_PATH, TEMPLATE_LIST } from '../../constants';

@Controller(TEMPLATE_CONTROLLER_PATH)
export class TemplateListGetController {
  constructor(
    @Inject(TEMPLATE_LIST) private readonly templateList: TemplateList
  ) {}

  @Get()
  get(): Promise<TemplateDto[]> {
    return this.templateList.getAllTemplates();
  }
}
