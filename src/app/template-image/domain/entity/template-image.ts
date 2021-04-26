export class TemplateImage {
  id: string;
  name: string;
  path: string;
  url: string;
  expiration: number;

  private constructor(
    id: string,
    name: string,
    path: string,
    url: string,
    expiration: number
  ) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.url = url;
    this.expiration = expiration;
  }

  static create(
    id: string,
    name: string,
    path: string = '',
    url: string = '',
    expiration: number = 0
  ) {
    return new TemplateImage(id, name, path, url, expiration);
  }
}
