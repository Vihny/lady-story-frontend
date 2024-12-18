
export interface Sale {
    id?: number,
    product_id?: number | string,
    customer_id?: number | string,
    sale_date?: Date,
    sale_state?: string,
    observation?: string,
}