import { EmailFormSchema } from "@/lib/zodDefinition";
import { MailService } from "./mail.services";

export async function sendEmailAction(prevState: any, formData: FormData) {
  const validatedField = EmailFormSchema.safeParse({
    sender: formData.get('sender'),
    destination: formData.get('destination'),
    subject: formData.get('subject'),
    body: formData.get('body'),
  })

  if (!validatedField.success) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: validatedField.error.flatten().fieldErrors,
      message:"Validation failed. Cannot send email"
    }
  }

  const API_URL = process.env.API_URL
  const mailService = new MailService(API_URL ? API_URL : "")
  const responseData = await mailService.sendEmail(validatedField.data)

  if (!responseData) {
    return {
      ...prevState,
      isLoading: false,
      responseError: 'Response Error',
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      isLoading: false,
      responseError: responseData.statusCode,
      message: responseData.error
    }
  }

  return  {
    isLoading: false,
    isSuccess: true,
    responseData: responseData,
    message: "Success Send Email!"
  }
}
