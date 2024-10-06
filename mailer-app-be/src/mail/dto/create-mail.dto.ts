import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class MailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  destination: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  sender: string;

  @IsString()
  subject: string;

  @IsString()
  body: string;
}
