export const splanScreenMinTime: any = 1500; // 2 seconds

export const serverURL: string =
  'https://6938-2401-4900-6347-27b5-948d-d687-3999-19f2.in.ngrok.io';

export enum OTP {
  TYPE_VERIFY_ACCOUNT = 'VERIFY_ACCOUNT',
  DESCRIPTION_VERIFY_ACCOUNT = "You'll receive a 6-digit OTP via email to verify your account",
  TYPE_FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  DESCRIPTION_FORGOT_PASSWORD = "You'll receive a 6-digit OTP via email to reset your password",
}
