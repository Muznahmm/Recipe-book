export interface LoginFormData {
    username: string;
    password: string;
}

export interface SignUpFormData {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface LoginResponse {
    id: number;
    email: string;
    username: string;
    token: string;
}

export interface AccountDetailsResponse {
    id: number;
    email: string;
    username: string;
}
