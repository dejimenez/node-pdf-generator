import { Template } from '../../template/domain/entity/template';

export class PdfGenerator {
  constructor(
    private readonly template: Template,
    private readonly data: Record<string, any>
  ) {}
}
