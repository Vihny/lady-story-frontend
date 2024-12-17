import { Product } from "../../interface/product.interface";
import api from "../api";

export async function getProduct() {
    const response = await api.get('product');
    return response.data;
}

export async function getProductById(id: number | string) {
    const response = await api.get(`product/${id}`);
    return response.data;
}

export async function setProduct(data: Product) {
    const response = await api.post('product/', data);
    return response;
}

export async function updateProduct(id: number | string, data: Product) {
    const response = await api.put(`product/${id}`, data);
    return response;
}

export async function deleteProduct(id: number | string) {
    const response = await api.delete(`product/${id}`);
    return response;
}