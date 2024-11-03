import api from "./api";

export async function getCustomer() {
    const response = await api.get('customer/all');
    console.log('deu certooo', response)
    return response.data;
}

export async function setCustomer() {
    const response = await api.post('customer/create');
    console.log('deu certooo', response)
    return response;
}

export async function updateCustomer(id: number) {
    const response = await api.put(`customer/update/${id}`);
    console.log('deu certooo', response)
    return response;
}

export async function deleteCustomer(id: number) {
    const response = await api.delete(`customer/delete/${id}`);
    console.log('deu certooo', response)
    return response;
}