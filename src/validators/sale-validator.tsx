import * as yup from 'yup';

export const schema = yup.object().shape({
  client: yup.string()
    .required('O cliente é obrigatório')
    .min(3, 'O cliente deve ter pelo menos 3 caracteres'),

  product: yup.string()
    .required('O nome do produto é obrigatório')
    .min(3, 'O nome do produto deve ter pelo menos 3 caracteres'),

  sale_state: yup.string()
    .required('O estado da venda é obrigatório')
    .min(1, 'O estado da venda deve ter pelo menos 3 caracteres'),

  sale_date: yup.date()
    .required('A data da venda é obrigatório')
    .min(1, 'A data da venda deve ter pelo menos 3 caracteres'),

  observation: yup.string()
  .required('A observação é obrigatório')
});