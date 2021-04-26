import { compile, registerHelper } from 'handlebars';
import { Inject, Injectable } from '../../../../core';
import template from '../../../template';
import { TEMPLATE_IMAGE_REPOSITORY } from '../../../template-image/constants';
import { TemplateImage } from '../../../template-image/domain/entity/template-image';
import { TemplateImageRepository } from '../../../template-image/domain/repository/template-image.repository';
import { TemplateEngine } from '../../domain/service/template-engine';
@Injectable()
export class HandlebarsTemplateEngine implements TemplateEngine {
  constructor() {
    this.registerImageHelper();
  }

  build(html: string, data: unknown): string {
    const template = compile(html);
    return template(data);
  }

  private registerImageHelper() {
    registerHelper('img', (options) => {
      const sourceKey = 'src';
      const keys = Object.keys(options.hash);

      if (!options.hash[sourceKey])
        throw new Error(`Image should have a "${sourceKey}" value`);

      const src = options.data?.root?.images?.find(
        (image: TemplateImage) => image.id === options.hash[sourceKey]
      );
      if (!src) throw new Error('Image not found');

      const attrs = keys
        .filter((key) => key !== sourceKey)
        .map((key: string) => `${key}="${options.hash[key]}"`)
        .join(' ');

      return `<img ${attrs} src="${src.url}">`;
    });
  }
}
