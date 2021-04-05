import { registerController, registerProvider } from '../../core';
import { TemplateList } from './application/template-list';
import {
  TEMPLATE_LIST,
  TEMPLATE_CREATE,
  TEMPLATE_REPOSITORY,
  TEMPLATE_FIND_BY_ID,
  TEMPLATE_DELETE,
  TEMPLATE_UPDATE,
} from './constants';
import { TemplateListGetController } from './infrastructure/controller/template-list.get.controller';
import { TemplateCreatePostController } from './infrastructure/controller/template-create.post.controller';
import { TemplateFindByIdGetController } from './infrastructure/controller/template-find-by-id.get.controller';
import { TemplateDeleteDeleteController } from './infrastructure/controller/template-delete.delete.controller';
import { TemplateUpdatePutController } from './infrastructure/controller/template-update.put.controller';
import { MongooseTemplateRepository } from './infrastructure/repository/mongoose-template-repository';
import { TemplateCreate } from './application/template-create';
import { TemplateFindById } from './application/template-find-by-id';
import { TemplateDelete } from './application/template-delete';
import { TemplateUpdate } from './application/template-update';

export { TEMPLATE_REPOSITORY };

export default () => {
  registerController(TemplateListGetController);
  registerController(TemplateCreatePostController);
  registerController(TemplateFindByIdGetController);
  registerController(TemplateUpdatePutController);
  registerController(TemplateDeleteDeleteController);
  registerProvider(TEMPLATE_LIST, TemplateList);
  registerProvider(TEMPLATE_FIND_BY_ID, TemplateFindById);
  registerProvider(TEMPLATE_CREATE, TemplateCreate);
  registerProvider(TEMPLATE_DELETE, TemplateDelete);
  registerProvider(TEMPLATE_UPDATE, TemplateUpdate);
  registerProvider(TEMPLATE_REPOSITORY, MongooseTemplateRepository);
};
