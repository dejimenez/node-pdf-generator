import { ExpirationTime } from '../../domain/value-object/expiration-time';
import { Bucket, Storage } from '@google-cloud/storage';

export class GcpStorage {
  private storage: Storage;
  private bucket: Bucket;

  constructor() {
    this.storage = new Storage({
      credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL!,
        private_key: process.env.GCP_PRIVATE_KEY!,
      },
    });
    this.bucket = this.storage.bucket(process.env.BUCKET!);
  }

  async getPresignedUrl(
    bucket: string,
    files: File[],
    basePath: string,
    expirationTime?: ExpirationTime
  ) {
    const expiration = this.getExpiration(expirationTime);

    return Promise.all(
      files.map(async (file) => {
        const extension = file.filename.split('.').pop();
        const filename = `${uuidv4()}.${extension}`;
        const [url] = await this.bucket
          .file(`${this.getPath(basePath, file.path)}${filename}`)
          .getSignedUrl({
            version: 'v4',
            action: 'write',
            contentType: file.contentType,
            ...expiration,
          });
        return { filename, url };
      })
    );
  }

  async downloadUrls(
    bucket: string,
    files: File[],
    basePath: string,
    expirationTime?: ExpirationTime
  ) {
    const expiration = this.getExpiration(expirationTime);

    return Promise.all(
      files.map(async (file) => {
        const [url] = await this.bucket
          .file(`${this.getPath(basePath, file.path)}${file.filename}`)
          .getSignedUrl({
            version: 'v4',
            action: 'read',
            ...expiration,
          });
        return url;
      })
    );
  }

  private getExpiration(expirationTime?: ExpirationTime) {
    let time: number = this.config.get<number>('SIGNED_URL_EXPIRATION');

    if (typeof expirationTime === 'number') time = expirationTime;
    else if (expirationTime === 'never') time = 7 * 24 * 60;

    return { expires: Date.now() + time * 60 * 1000 };
  }
}
