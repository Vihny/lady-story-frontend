import { Supplier } from "../../interface/supplier.interface";
import api from "../api";

export async function getSupplier() {
    const response = await api.get('supplier');
    return response.data;
}

export async function getSupplierById(id: number | string) {
    const response = await api.get(`supplier/${id}`);
    return response.data;
}

export async function setSupplier(data: Supplier) {
    const response = await api.post('supplier/', data);
    return response;
}

export async function updateSupplier(id: number | string, data: Supplier) {
    const response = await api.put(`supplier/${id}`, data);
    return response;
}

export async function deleteSupplier(id: string | number) {
    const response = await api.delete(`supplier/${id}`);
    return response;
}