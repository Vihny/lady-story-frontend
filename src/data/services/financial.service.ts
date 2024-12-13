
import { Financial } from "../../interface/financial.interface";
import api from "../api";

export async function getFinancial() {
    const response = await api.get('financial');
    return response.data;
}

export async function getFinancialById(id: number | string) {
    const response = await api.get(`financial/one/${id}`);
    return response.data;
}

export async function setFinancial(data: Financial) {
    const response = await api.post('financial/create', data);
    return response;
}

export async function updateFinancial(id: number | string, data: Financial) {
    const response = await api.patch(`financial/update/${id}`, data);
    return response;
}

export async function deleteFinancial(id: number) {
    const response = await api.delete(`financial/delete/${id}`);
    return response;
}