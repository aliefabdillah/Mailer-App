import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailDto } from './dto/create-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  send(@Body() createMailDto: MailDto) {
    return this.mailService.sendUserEmail(createMailDto);
  }

  // get list of email history from request body that containing array of email id
  @Get('history')
  async findAll(@Body('email_id') emailIdList: []) {
    const emailHistory = await Promise.all(
      emailIdList.map((emailId) => this.mailService.getUserEmail(emailId)),
    );

    return emailHistory;
  }

  // get detail of email history
  @Get('history/:id')
  findOne(@Param('id') id: string) {
    return this.mailService.getUserEmail(id);
  }
}
