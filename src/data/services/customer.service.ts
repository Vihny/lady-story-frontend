import { QueryFunctionContext } from "@tanstack/react-query";
import { Customer } from "../../interface/customer.interface";
import api from "../api";

export async function getCustomer({ queryKey }: QueryFunctionContext<string[]>) {
    const filters = queryKey[1];
    const parsedFilters = filters ? JSON.parse(filters) : {};
    const response = await api.get('customer', { params: { ...parsedFilters } });
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