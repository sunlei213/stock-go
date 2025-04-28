export interface User {
    id: number;
    username: string;
    email: string;
    role: 'admin' | 'user';
    created_at: string;
    updated_at: string;
}

export interface Admin {
    id: number;
    username: string;
    token: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginForm {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
} 