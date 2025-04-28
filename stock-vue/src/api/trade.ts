import request from '@/utils/request'
import type { Trade, TradeForm, TradeQuery } from '@/types/trade'
import type { Sender, Receiver } from '../types/trade';

const API_BASE_URL = 'http://localhost:8001/api';

export const getTrades = (params?: TradeQuery) => {
  return request.get<Trade[]>('/api/trades', { params })
}

export const getTrade = (id: number) => {
  return request.get<Trade>(`/api/trades/${id}`)
}

export const createTrade = (data: TradeForm) => {
  return request.post<Trade>('/api/trades', data)
}

export const updateTrade = (id: number, data: TradeForm) => {
  return request.put<Trade>(`/api/trades/${id}`, data)
}

export const deleteTrade = (id: number) => {
  return request.delete(`/api/trades/${id}`)
}

export const getSenders = async (): Promise<Sender[]> => {
  const response = await request.get<Sender[]>(`${API_BASE_URL}/senders`)
  return response.data
}

export const createSender = async (senderData: Omit<Sender, 'id' | 'createdAt' | 'updatedAt'>): Promise<Sender> => {
  const response = await request.post<Sender>(`${API_BASE_URL}/senders`, senderData)
  return response.data
}

export const getReceivers = async (): Promise<Receiver[]> => {
  const response = await request.get<Receiver[]>(`${API_BASE_URL}/receivers`)
  return response.data
} 