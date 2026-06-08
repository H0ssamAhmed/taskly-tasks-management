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
