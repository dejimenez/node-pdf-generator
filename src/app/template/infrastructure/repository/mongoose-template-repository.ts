import { Template } from '../../domain/entity/template';
import { TemplateRepository } from '../../domain/repository/template-repository';
import { TemplateModel } from './template-model';
import { model, Model } from 'mongoose';
import { templateSchema } from './template-schema';
import { Injectable } from '../../../../core';
import { fromTemplateModelToTemplate } from './map-template';
import { PartialWithId } from '../../../shared/domain/partial-with-id';

@Injectable()
export class MongooseTemplateRepository implements TemplateRepository {
  private model: Model<TemplateModel>;

  constructor() {
    this.model = model('Template', templateSchema);
  }

  async list(): Promise<Template[]> {
    const templates = await this.model.find().exec();
    return templates.map((template) => fromTemplateModelToTemplate(template));
  }

  async findById(id: string): Promise<Template | null> {
    const template = await this.model.findOne({ id }).exec();
    return template && fromTemplateModelToTemplate(template);
  }

  async create(template: Template): Promise<void> {
    const newTemplate = new this.model(template);
    await newTemplate.save();
  }

  async update(template: PartialWithId<Template>): Promise<Template | null> {
    const updated = await this.model
      .findOneAndUpdate({ id: template.id }, template)
      .exec();
    return updated && fromTemplateModelToTemplate(updated);
  }

  async delete(id: string): Promise<Template | null> {
    const deleted = await this.model.findOneAndDelete({ id }).exec();
    return deleted && fromTemplateModelToTemplate(deleted);
  }
}
