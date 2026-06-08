export type Email = string;
export type Password = string;
export type Name = string;
export type Department = string;

export interface SignUpPayload {
  email: Email;
  password: Password;
  data: {
    name: Name;
    department?: Department;
  };
}
export interface loginInPayload {
  email: Email;
  password: Password;
}

export interface UserType {
  department: string;
  email: string;
  email_verified: boolean;
  name: string;
  phone_verified: boolean;
  sub: string;
}
