import { EmailFormSchema } from "@/lib/zodDefinition";
import { mailService } from "./index.service";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendEmailAction(prevState: any, formData: FormData) {
  const validatedField = EmailFormSchema.safeParse({
    sender: formData.get("sender"),
    destination: formData.get("destination"),
    subject: formData.get("subject"),
    body: formData.get("body"),
    files: formData.getAll("files"),
  });

  if (!validatedField.success) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: validatedField.error.flatten().fieldErrors,
      message: "Validation failed. Cannot send email",
    };
  }

  const newFormData = new FormData();
  newFormData.append("sender", validatedField.data.sender);
  newFormData.append("destination", validatedField.data.destination);
  newFormData.append(
    "subject",
    validatedField.data.subject ? validatedField.data.subject : ""
  );
  newFormData.append(
    "body",
    validatedField.data.body ? validatedField.data.body : ""
  );
  if (validatedField.data.files && Array.isArray(validatedField.data.files)) {
    validatedField.data.files.forEach((file) => {
      newFormData.append("files", file, file.name);
    });
  } else {
    // No files to append
    newFormData.append("files", "");
  }

  const responseData = await mailService.sendEmail(newFormData);

  if (!responseData) {
    return {
      ...prevState,
      isLoading: false,
      isSuccess: false,
      responseError: "Response Error",
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      isLoading: false,
      isSuccess: false,
      responseError: responseData.statusCode,
      message: responseData.error,
    };
  }

  return {
    isLoading: false,
    isSuccess: true,
    responseData: responseData,
    message: "Success Send Email!",
  };
}
