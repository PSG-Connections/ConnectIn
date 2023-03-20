export interface User {
  first_name: string
  last_name: string
  email: string
  profile_image_url: string
  password: string
  phone_number: string
  verified: boolean
  headline: string
  country: string
  city: string
  Otp: Otp
  UserEducation: UserEducation[]
  UserIndustry: UserIndustry
  UserExperience: UserExperience[]
}

export interface UserEducation {
  user_id: number
  school: string
  degree: string
  field_of_study: string
  grade: string
  start_date: string
  end_date: string
}

export interface Otp {
  user_id: number
  otp: string
  type: string
}

export interface UserIndustry {
  user_id: number
  industry: string
}

export interface UserExperience {
  ID: number
  user_id: number
  title: string
  company: string
  start_date: string
  end_date: string
  currently_working: boolean
}
