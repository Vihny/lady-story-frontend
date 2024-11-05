import { Product } from "../../interface/product.interface";
import api from "./api";

export async function getProduct() {
    const response = await api.get('product/all');
    console.log('deu certooo', response)
    return response.data;
}

export async function setProduct(data: Product) {
    const response = await api.post('product/create', data);
    console.log('deu certooo', response)
    return response;
}

export async function updateProduct(id: number) {
    const response = await api.put(`product/update/${id}`);
    console.log('deu certooo', response)
    return response;
}

export async function deleteProduct(id: number) {
    const response = await api.delete(`product/delete/${id}`);
    console.log('deu certooo', response)
    return response;
}