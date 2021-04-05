import { Controller, Body, Inject, Put } from '../../../../core';
import { TEMPLATE_CONTROLLER_PATH, TEMPLATE_UPDATE } from '../../constants';
import { TemplateUpdate } from '../../application/template-update';
import { PartialWithId } from '../../../shared/domain/partial-with-id';
import { Template } from '../../domain/entity/template';

@Controller(TEMPLATE_CONTROLLER_PATH)
export class TemplateUpdatePutController {
  constructor(
    @Inject(TEMPLATE_UPDATE) private readonly templateUpdate: TemplateUpdate
  ) {}

  @Put()
  put(@Body() template: PartialWithId<Template>): Promise<void> {
    return this.templateUpdate.update(template);
  }
}
