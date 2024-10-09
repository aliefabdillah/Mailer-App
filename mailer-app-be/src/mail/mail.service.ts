import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MailDto } from './dto/create-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async sendUserEmail(mailDto: MailDto, files: Array<Express.Multer.File>) {
    // upload files
    const cloudFileNames = await Promise.all(
      files.map(async (file) => {
        return this.cloudinary
          .uploadFile(file)
          .then((data) => {
            return {
              statusCode: 200,
              data: data.secure_url,
            };
          })
          .catch((err) => {
            return { statusCode: 400, data: err.message };
          });
      }),
    );

    const filesName = cloudFileNames.map((fileName) => {
      if (fileName.statusCode === 400) {
        throw new BadRequestException('Failed To Upload Files');
      }
      return fileName.data;
    });

    // send email from input user
    await this.mailerService
      .sendMail({
        from: mailDto.sender,
        to: mailDto.destination,
        subject: mailDto.subject,
        template: './email',
        context: {
          body: mailDto.body,
        },
        attachments: files.map((file) => ({
          filename: file.originalname, // The original name of the file
          content: file.buffer, // The file buffer
        })),
      })
      .catch(() => {
        throw new BadRequestException('Failed To Send Email');
      });

    // add email to database
    try {
      const newEmail = await this.prisma.mail.create({
        data: {
          ...mailDto,
          files: filesName.toString(),
        },
      });
      return newEmail;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getUserEmail(id: string) {
    try {
      const emailData = await this.prisma.mail.findUnique({
        where: { id: id },
        select: {
          id: true,
          destination: true,
          subject: true,
          body: true,
          sender: true,
          files: true,
          createdAt: true,
        },
      });

      if (!emailData) {
        throw new NotFoundException('Email not found!').getResponse();
      }

      return emailData;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
