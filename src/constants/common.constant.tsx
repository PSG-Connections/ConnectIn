export const splanScreenMinTime: any = 1500; // 2 seconds

export const profileServerURL: string = 'https://api.psglinkedin.tech/profile';
export const postServerURL: string = 'https://api.psglinkedin.tech/post';

export enum OTP {
  TYPE_VERIFY_ACCOUNT = 'VERIFY_ACCOUNT',
  DESCRIPTION_VERIFY_ACCOUNT = "You'll receive a 6-digit OTP via email to verify your account",
  TYPE_FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  DESCRIPTION_FORGOT_PASSWORD = "You'll receive a 6-digit OTP via email to reset your password",
}
