import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { MailDto } from './dto/create-mail.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  @UseInterceptors(FilesInterceptor('files'))
  send(
    @Body() createMailDto: MailDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.mailService.sendUserEmail(createMailDto, files);
  }

  // get list of email history from request body that containing array of email id
  @Get('history')
  async findAll(@Query('email_id') emailIdList: Array<string>) {
    if (emailIdList.length == 0) {
      throw new NotFoundException('Email Not Found');
    }

    if (emailIdList instanceof Array) {
      const emailHistory = await Promise.all(
        emailIdList.map((emailId) => this.mailService.getUserEmail(emailId)),
      );

      emailHistory.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      return emailHistory;
    } else {
      const emailHistory = await this.mailService.getUserEmail(emailIdList);
      const emailHistoryArray = Array.isArray(emailHistory)
        ? emailHistory
        : [emailHistory];
      return emailHistoryArray;
    }
  }

  // get detail of email history
  @Get('history/:id')
  findOne(@Param('id') id: string) {
    return this.mailService.getUserEmail(id);
  }
}
