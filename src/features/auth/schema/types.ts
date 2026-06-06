export type Email = string;
export type Password = string;
export type Name = string;
export type JobTitle = string;

export interface SignUpPayload {
  email: Email;
  password: Password;
  data: {
    name: Name;
    department?: JobTitle;
  };
}
export interface loginInPayload {
  email: Email;
  password: Password;
}
