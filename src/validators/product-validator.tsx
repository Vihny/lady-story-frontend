import * as yup from 'yup';

export const schema = yup.object().shape({
    name: yup.string()
      .required('O nome do produto é obrigatório')
      .min(3, 'O nome do produto deve ter pelo menos 3 caracteres'),

    brand: yup.string()
      .required('A marca do produto é obrigatório')
      .min(3, 'A marca do produto deve ter pelo menos 3 caracteres'),

    model: yup.string()
      .required('O modelo do produto é obrigatório')
      .min(3, 'O modelo do produto deve ter pelo menos 3 caracteres'),

    type: yup.string()
      .required('O tipo do produto é obrigatório')
      .min(3, 'O tipo do produto deve ter pelo menos 3 caracteres'),

    size: yup.string()
      .required('O tamanho do produto é obrigatório')
      .min(1, 'O tamanho do produto deve ter pelo menos 1 caracteres'),

    color: yup.string()
      .required('A cor do produto é obrigatório')
      .max(8, 'A cor do produto deve ter pelo menos 3 caracteres'),

    price: yup.string()
      .required('O preço do produto é obrigatório')
      .min(3, 'O preço do produto deve ter pelo menos 3 caracteres'),
});