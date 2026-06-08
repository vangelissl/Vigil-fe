export interface User{
	id: string;
	email: string;
	username: string;
}

export interface TokenPair{
	access_token: string;
	refresh_token: string;
}

export interface LoginRequest{
	email: string;
	password: string;
}

export interface RegisterRequest{
	email: string;
	username: string;
	password: string;
}

export interface AuthResponse{
	access_token: string;
	user: User;
}