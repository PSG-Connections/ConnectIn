export const splanScreenMinTime: any = 1500; // 2 seconds

export const serverURL: string =
  'https://6481-2409-4072-6e15-3e58-4de6-3475-febf-2fbf.in.ngrok.io';

export enum OTP {
  TYPE_VERIFY_ACCOUNT = 'VERIFY_ACCOUNT',
  DESCRIPTION_VERIFY_ACCOUNT = "You'll receive a 6-digit OTP via email to verify your account",
  TYPE_FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  DESCRIPTION_FORGOT_PASSWORD = "You'll receive a 6-digit OTP via email to reset your password",
}
