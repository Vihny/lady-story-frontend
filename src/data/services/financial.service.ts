
import { Financial } from "../../interface/financial.interface";
import api from "../api";

export async function getFinancial() {
    const response = await api.get('financial');
    return response.data;
}

export async function getFinancialById(id: number | string) {
    const response = await api.get(`financial/${id}`);
    return response.data;
}

export async function setFinancial(data: Financial) {
    const response = await api.post('financial/', data);
    return response;
}

export async function updateFinancial(id: number | string, data: Financial) {
    const response = await api.patch(`financial/${id}`, data);
    return response;
}

export async function deleteFinancial(id: number | string) {
    const response = await api.delete(`financial/${id}`);
    return response;
}