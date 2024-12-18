
import { Sale } from "../../interface/sale.interface.";
import api from "../api";

export async function getSale() {
    const response = await api.get('sale');
    return response.data;
}

export async function getSaleById(id: number | string) {
    const response = await api.get(`sale/${id}`);
    return response.data;
}

export async function setSale(data: Sale) {
    const response = await api.post('sale/', data);
    return response;
}

export async function updateSale(id: number | string, data: Sale) {
    const response = await api.put(`sale/${id}`, data);
    return response;
}

export async function deleteSale(id: number | string) {
    const response = await api.delete(`sale/${id}`);
    return response;
}