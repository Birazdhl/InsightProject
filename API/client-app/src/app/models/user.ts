export interface IUser {
  username: string;
  displayName: string;
  token: string;
  image?: string;
  userId: string;
}

export interface IUserFormValues {
  email: string;
  password: string;
  displayName?: string;
  username?: string;
}
