export class TemplateImageDto {
  id: string;
  name: string;
  path: string;
  url: string;

  constructor(id: string, name: string, path: string, url: string) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.url = url;
  }
}
