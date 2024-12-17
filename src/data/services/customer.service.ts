import { Customer } from "../../interface/customer.interface";
import api from "../api";

export async function getCustomer() {
    const response = await api.get('customer');
    return response.data;
}

export async function getCustomerById(id: number | string) {
    const response = await api.get(`customer/${id}`);
    return response.data;
}

export async function setCustomer(data: Customer) {
    const response = await api.post('customer/', data);
    return response;
}

export async function updateCustomer(id: number | string, data: Customer) {
    const response = await api.put(`customer/${id}`, data);
    return response;
}

export async function deleteCustomer(id: number | string) {
    const response = await api.delete(`customer/${id}`);
    return response;
}