export interface User {
  id: string;
  email: string;
  username: string;
}

export interface UpdateUserRequest {
  email?: string;
  username?: string;
}