import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadFile(
    fileName: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });
      const upload = v2.uploader.upload_stream(
        { folder: process.env.CLOUD_FOLDER },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      const stream = Readable.from(fileName.buffer);
      stream.pipe(upload);
    });
  }
}
