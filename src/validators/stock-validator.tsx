import * as yup from 'yup';

export const schema = yup.object().shape({
  code: yup.string()
    .required('O código é obrigatório')
    .min(3, 'O código deve ter pelo menos 3 caracteres'),

  complement: yup.string()
    .required('O complemento é obrigatório')
    .min(3, 'O complemento deve ter pelo menos 3 caracteres'),

  name: yup.string()
    .required('O nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),

  quantity: yup.number()
    .required('A quantidade é obrigatório')
    .min(1, 'A quantidade deve ter pelo menos 3 caracteres'),

  unit: yup.string()
    .required('A unidade é obrigatório')
    .min(1, 'A unidade deve ter pelo menos 3 caracteres'),

  product_id: yup.string()
    .required('O produto é obrigatório')
});