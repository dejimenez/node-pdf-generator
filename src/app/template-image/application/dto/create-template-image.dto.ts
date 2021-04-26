export class CreateTemplateImageDto {
  id: string;
  name: string;

  constructor(id: string, name: string, path: string) {
    this.id = id;
    this.name = name;
  }
}
