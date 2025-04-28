export interface Trade {
    id: number;
    stock_id: number;
    stock_code: string;
    stock_name: string;
    trade_type: 'buy' | 'sell';
    price: number;
    quantity: number;
    amount: number;
    trade_date: string;
    notes?: string;
    created_at: string;
    updated_at: string;
}

export interface TradeForm {
    stock_id: number;
    trade_type: 'buy' | 'sell';
    price: number;
    quantity: number;
    trade_date: string;
    notes?: string;
}

export interface TradeQuery {
    stock_id?: number;
    trade_type?: 'buy' | 'sell';
    start_date?: string;
    end_date?: string;
    page?: number;
    page_size?: number;
}

export interface Sender {
    id: number;
    userId: number;
    meetingDay: string;
    startTime: string;
    code: string;
    shorsz: string;
    price: number;
    volume: number;
    type: string;
    createdAt: string;
    updatedAt: string;
}

export interface Receiver {
    id: number;
    meetingDay: string;
    startTime: string;
    stg: string;
    type: string;
    msg: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTradeDto {
    stockCode: string;
    stockName: string;
    type: 'buy' | 'sell';
    price: number;
    volume: number;
    status: 'pending' | 'completed' | 'cancelled';
}

export interface UpdateTradeDto extends Partial<CreateTradeDto> {} 