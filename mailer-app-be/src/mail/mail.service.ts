import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailDto } from './dto/create-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private prisma: PrismaService,
  ) {}

  async sendUserEmail(mailDto: MailDto) {
    try {
      // send email from input user
      await this.mailerService.sendMail({
        from: mailDto.sender,
        to: mailDto.destination,
        subject: mailDto.subject,
        template: './email',
        context: {
          body: mailDto.body,
        },
      });

      // add email to database
      const newEmail = await this.prisma.mail.create({
        data: {
          ...mailDto,
        },
      });
      return newEmail;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
