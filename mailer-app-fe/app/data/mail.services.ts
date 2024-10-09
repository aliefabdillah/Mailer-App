/* eslint-disable @typescript-eslint/no-explicit-any */
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
      .post(`/send`, emailData)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  };

  getHistoryList = (listEmailId: Array<string>) => {
    const params = new URLSearchParams();

    // Add email IDs as query parameters
    if (listEmailId.length > 0) {
      listEmailId.forEach((id: string) => params.append("email_id", id));
    } else {
      params.append("email_id", "");
    }
    return this.instance
      .get(`/history?${params.toString()}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  };

  getHistoryDetail = (emailId: string) => {
    return this.instance
      .get(`/history/${emailId}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  };
}
