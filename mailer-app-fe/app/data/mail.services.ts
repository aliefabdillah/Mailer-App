import axios, { AxiosInstance } from "axios";

export class MailService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  sendEmail = (emailData: any) => {
    return this.instance
      .post(`/mail/send`, emailData)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  };
}
