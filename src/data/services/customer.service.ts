import { Customer } from "../../interface/customer.interface";
import { Filters } from "../../interface/filters/customer-filters.interface";
import api from "./api";

export async function getCustomer(filters: Filters) {
    const response = await api.get('customer/all', {params: {...filters}});
    return response.data;
}

export async function getCustomerById(id: number | string) {
    const response = await api.get(`customer/one/${id}`);
    return response.data;
}

export async function setCustomer(data: Customer) {
    const response = await api.post('customer/create', data);
    return response;
}

export async function updateCustomer(id: number | string, data: Customer) {
    const response = await api.patch(`customer/update/${id}`, data);
    return response;
}

export async function deleteCustomer(id: number) {
    const response = await api.delete(`customer/delete/${id}`);
    return response;
}