import request from '@/utils/request'
import type { User, LoginForm, LoginResponse } from '@/types/user'

export const loginApi = (data: LoginForm) => {
  return request.post<LoginResponse>('/api/auth/login', data)
}

export const logoutApi = () => {
  return request.post('/api/auth/logout')
}

export const getCurrentUserApi = () => {
  return request.get<User>('/api/user/current')
}

export const updateUserApi = (id: number, data: Partial<User>) => {
  return request.put<User>(`/api/user/${id}`, data)
} 