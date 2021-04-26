import { model, Model } from 'mongoose';
import { Injectable } from '../../../../core';
import { PartialWithId } from '../../../shared/domain/partial-with-id';
import { TemplateImage } from '../../domain/entity/template-image';
import { TemplateImageRepository } from '../../domain/repository/template-image.repository';
import { TemplateImageModelMap } from './template-image-model-map';
import { TemplateImageModel } from './template-image.model';
import { templateImageSchema } from './template-image.schema';

@Injectable()
export class MongooseTemplateImageRepository
  implements TemplateImageRepository {
  private model: Model<TemplateImageModel>;

  constructor() {
    this.model = model('TemplateImage', templateImageSchema);
  }

  async list(): Promise<TemplateImage[]> {
    const templateImages = await this.model.find().exec();

    return templateImages.map(
      (templateImage) => TemplateImageModelMap.toTemplateImage(templateImage)!
    );
  }

  async findAll(ids: string[]): Promise<TemplateImage[]> {
    const templateImages = await this.model.find({ id: { $in: ids } }).exec();

    return templateImages.map(
      (templateImage) => TemplateImageModelMap.toTemplateImage(templateImage)!
    );
  }

  async findById(id: string): Promise<TemplateImage | null> {
    const templateImage = await this.model.findOne({ id }).exec();
    return TemplateImageModelMap.toTemplateImage(templateImage);
  }

  async create(templateImage: TemplateImage): Promise<void> {
    const newTemplateImage = new this.model(templateImage);
    await newTemplateImage.save();
  }

  async update(
    templateImage: PartialWithId<TemplateImage>
  ): Promise<TemplateImage | null> {
    const updated = await this.model
      .findOneAndUpdate({ id: templateImage.id }, templateImage, { new: true })
      .exec();
    return TemplateImageModelMap.toTemplateImage(updated);
  }

  async remove(id: string): Promise<TemplateImage | null> {
    const deleted = await this.model.findOneAndDelete({ id }).exec();
    return TemplateImageModelMap.toTemplateImage(deleted);
  }
}
