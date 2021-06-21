export interface LoginFormData {
    username: string,
    password: string,
}

export interface SignUpFormData {
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
}

export interface LoginResponse {
    id: string,
    email: string,
    username: string,
    token: string,
}
