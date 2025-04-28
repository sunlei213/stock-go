import { ElMessage, ElMessageBox } from 'element-plus'
import type { AxiosError } from 'axios'

interface ApiResponse {
  message?: string
  [key: string]: any
}

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof AppError) {
    ElMessage.error(error.message)
    return
  }

  if ((error as AxiosError).response) {
    const response = (error as AxiosError<ApiResponse>).response
    const message = response?.data?.message || '请求失败'
    ElMessage.error(message)
    return
  }

  ElMessage.error('系统错误,请稍后重试')
}

export const handleConfirm = async (message: string, title = '提示') => {
  try {
    await ElMessageBox.confirm(message, title, {
      type: 'warning'
    })
    return true
  } catch {
    return false
  }
} 