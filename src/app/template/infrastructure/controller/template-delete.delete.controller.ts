import { Controller, Inject, Param, Delete } from '../../../../core';
import { TemplateDelete } from '../../application/template-delete';
import { TEMPLATE_CONTROLLER_PATH, TEMPLATE_DELETE } from '../../constants';

@Controller(TEMPLATE_CONTROLLER_PATH)
export class TemplateDeleteDeleteController {
  constructor(
    @Inject(TEMPLATE_DELETE) private readonly templateDelete: TemplateDelete
  ) {}

  @Delete(':templateId')
  delete(@Param('templateId') templateId: string): Promise<void> {
    return this.templateDelete.delete(templateId);
  }
}
