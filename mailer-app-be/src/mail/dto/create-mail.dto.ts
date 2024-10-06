import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class MailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  destinationEmail: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  senderEmail: string;

  @IsString()
  subject: string;

  @IsString()
  body: string;
}
