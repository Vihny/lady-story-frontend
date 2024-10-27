import api from "./api";

export async function getCustomer() {
    try {
        const response = await api.get('customer/all');
        console.log('deu certooo', response)
        return response;
    } catch {
        console.log('deu erradooo');
    }
}