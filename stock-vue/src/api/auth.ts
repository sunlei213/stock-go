import axios from 'axios';
import type { Admin } from '../types/user';

const API_BASE_URL = 'http://localhost:8001/api';

export const login = async (username: string, password: string): Promise<Admin> => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password
    });
    return response.data;
};

export const logout = async (): Promise<void> => {
    await axios.post(`${API_BASE_URL}/auth/logout`);
}; 