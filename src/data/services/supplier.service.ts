import { Supplier } from "../../interface/supplier.interface";
import api from "../api";

export async function getSupplier() {
    const response = await api.get('supplier');
    return response.data;
}

export async function getSupplierById(id: number | string) {
    const response = await api.get(`supplier/one/${id}`);
    return response.data;
}

export async function setSupplier(data: Supplier) {
    const response = await api.post('supplier/create', data);
    return response;
}

export async function updateSupplier(id: number | string, data: Supplier) {
    const response = await api.patch(`supplier/update/${id}`, data);
    return response;
}

export async function deleteSupplier(id: number) {
    const response = await api.delete(`supplier/delete/${id}`);
    return response;
}