export class TemplateId {
  private readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  getValue(): string {
    return this.id;
  }
}
