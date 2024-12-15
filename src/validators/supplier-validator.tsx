import * as yup from 'yup';

export const schema = yup.object().shape({
  company_name: yup.string()
    .required('O nome da empresa é obrigatório')
    .min(3, 'O nome da empresa deve ter pelo menos 3 caracteres'),

  trading_name: yup.string()
    .required('O nome da negociação é obrigatório')
    .min(3, 'O nome da negociação deve ter pelo menos 3 caracteres'),

  cnpj: yup.string()
    .required('O CNPJ da empresa é obrigatório')
    .min(3, 'O CNPJ da empresa deve ter pelo menos 3 caracteres'),

  phone: yup.string()
    .required('O telefone é obrigatório')
    .min(3, 'O telefone deve ter pelo menos 3 caracteres'),
});