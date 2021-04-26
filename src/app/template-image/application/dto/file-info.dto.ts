export class FileInfoDto {
  fileName: string;
  contentType: string;

  constructor(fileName: string, contentType: string) {
    this.fileName = fileName;
    this.contentType = contentType;
  }
}
