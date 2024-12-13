
import { Sale } from "../../interface/sale.interface.";
import api from "../api";

export async function getSale() {
    const response = await api.get('sale');
    return response.data;
}

export async function getSaleById(id: number | string) {
    const response = await api.get(`sale/one/${id}`);
    return response.data;
}

export async function setSale(data: Sale) {
    const response = await api.post('sale/create', data);
    return response;
}

export async function updateSale(id: number | string, data: Sale) {
    const response = await api.patch(`sale/update/${id}`, data);
    return response;
}

export async function deleteSale(id: number) {
    const response = await api.delete(`sale/delete/${id}`);
    return response;
}