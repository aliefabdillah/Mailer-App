import { MailService } from "./mail.services"

const API_URL = process.env.API_URL

export const mailService = new MailService(`${API_URL}/mail`)