import * as yup from 'yup';

export const schema = yup.object().shape({
  customer_id: yup.number()
    .required('O cliente é obrigatório'),

  product_id: yup.number()
    .required('O produto é obrigatório'),

  stock_id: yup.number()
    .required('O estoque é obrigatório'),

  sale_state: yup.string()
    .required('O estado da venda é obrigatório')
    .min(1, 'O estado da venda deve ter pelo menos 3 caracteres'),

  sale_date: yup.date()
    .required('A data da venda é obrigatório')
    .min(1, 'A data da venda deve ter pelo menos 3 caracteres'),

  observation: yup.string()
  .required('A observação é obrigatório')
});