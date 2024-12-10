import { Product } from "../../interface/product.interface";
import { QueryFunctionContext } from '@tanstack/react-query';
import api from "../api";

export async function getProduct({ queryKey }: QueryFunctionContext<string[]>) {
    const filters = queryKey[1];
    const parsedFilters = filters ? JSON.parse(filters) : {};
    const response = await api.get('product', { params: { ...parsedFilters } });
    return response.data;
}

export async function getProductById(name: string) {
    const response = await api.get(`product/search/${name}`);
    return response.data;
}

export async function setProduct(data: Product) {
    const response = await api.post('product/create', data);
    return response;
}

export async function updateProduct(id: number | string, data: Product) {
    const response = await api.patch(`product/update/${id}`, data);
    return response;
}

export async function deleteProduct(id: number | string) {
    const response = await api.delete(`product/delete/${id}`);
    return response;
}