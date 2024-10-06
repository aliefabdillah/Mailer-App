import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailDto } from './dto/create-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  send(@Body() createMailDto: MailDto) {
    return this.mailService.sendUserEmail(createMailDto);
  }
}
