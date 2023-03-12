export const splanScreenMinTime: any = 1500; // 2 seconds

export const serverURL: string =
  'https://6618-2401-4900-6338-ce29-6cf4-8eb4-e90-ead4.in.ngrok.io';

export enum OTP {
  TYPE_VERIFY_ACCOUNT = 'VERIFY_ACCOUNT',
  DESCRIPTION_VERIFY_ACCOUNT = "You'll receive a 6-digit OTP via email to verify your account",
  TYPE_FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  DESCRIPTION_FORGOT_PASSWORD = "You'll receive a 6-digit OTP via email to reset your password",
}
