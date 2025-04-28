export interface Stock {
    id: number;
    userId: number;
    stockCode: string;
    stockName: string;
    quantity: number;
    usedStock: number;
    price: number;
    nowPrice: number;
    loss: number;
    lossPer: number;
    lockQuantity: number;
    buyQuantity: number;
    sellQuantity: number;
    createdAt: string;
    updatedAt: string;
} 
export interface StockForm {
    code: string;
    name: string;
    current_price: number;
} 