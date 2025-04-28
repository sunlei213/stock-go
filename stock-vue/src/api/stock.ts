import request from '@/utils/request'
import type { Stock } from '@/types/stock'

export const getStocks = () => {
  return request.get<Stock[]>('/api/stocks')
}

export const getStock = (id: number) => {
  return request.get<Stock>(`/api/stocks/${id}`)
}

export const createStock = (data: Partial<Stock>) => {
  return request.post<Stock>('/api/stocks', data)
}

export const updateStock = (id: number, data: Partial<Stock>) => {
  return request.put<Stock>(`/api/stocks/${id}`, data)
}

export const deleteStock = (id: number) => {
  return request.delete(`/api/stocks/${id}`)
} 