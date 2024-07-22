export interface CreateUserRequest {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ReadUserRequest {
  userId: string;
}
