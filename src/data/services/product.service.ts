import { Filters } from "../../interface/filters/product-filters.interface";
import { Product } from "../../interface/product.interface";
import api from "./api";

export async function getProduct(filters: Filters) {
    const response = await api.get('product/all', {params: {...filters}});
    return response.data;
}

export async function getProductById(id: number | string) {
    const response = await api.get(`product/one/${id}`);
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

export async function deleteProduct(id: number) {
    const response = await api.delete(`product/delete/${id}`);
    return response;
}