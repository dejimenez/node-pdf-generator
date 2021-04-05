import { Template } from '../../domain/entity/template';
import { TemplateRepository } from '../../domain/repository/template-repository';
import { Injectable } from '../../../../core';
import { PartialWithId } from '../../../shared/domain/partial-with-id';

@Injectable()
export class InMemoryTemplateRepository implements TemplateRepository {
  private readonly templates: Template[];

  constructor() {
    this.templates = [];
  }

  list(): Promise<Template[]> {
    return Promise.resolve(this.templates);
  }

  findById(id: string): Promise<Template | null> {
    return Promise.resolve(
      this.templates.find((template) => template.id === id) ?? null
    );
  }

  async create(template: Template): Promise<void> {
    this.templates.push(template);
    return Promise.resolve();
  }

  async update(
    updateTemplate: PartialWithId<Template>
  ): Promise<Template | null> {
    const foundTemplate =
      this.templates.find((template) => template.id === updateTemplate.id) ??
      null;

    if (!foundTemplate) return Promise.resolve(null);

    Object.assign(foundTemplate, updateTemplate);
    return Promise.resolve(foundTemplate);
  }

  async delete(id: string): Promise<Template | null> {
    const foundTemplate =
      this.templates.findIndex((template) => template.id === id) ?? null;

    if (foundTemplate === -1) return Promise.resolve(null);
    const template = this.templates[foundTemplate];

    this.templates.splice(foundTemplate, 1);

    return Promise.resolve(template);
  }
}
