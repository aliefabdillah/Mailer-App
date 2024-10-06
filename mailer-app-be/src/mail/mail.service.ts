import { Injectable } from '@nestjs/common';
import { MailDto } from './dto/create-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserEmail(mailDto: MailDto) {
    return mailDto;
  }
}
