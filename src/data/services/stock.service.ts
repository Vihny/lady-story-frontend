
import { Stock } from "../../interface/stock.interface";
import api from "../api";

export async function getStock() {
    const response = await api.get('stock');
    return response.data;
}

export async function getStockById(id: number | string) {
    const response = await api.get(`stock/${id}`);
    return response.data;
}

export async function setStock(data: Stock) {
    const response = await api.post('stock', data);
    return response;
}

export async function updateStock(id: number | string, data: Stock) {
    const response = await api.put(`stock/${id}`, data);
    return response;
}

export async function deleteStock(id: number | string) {
    const response = await api.delete(`stock/${id}`);
    return response;
}