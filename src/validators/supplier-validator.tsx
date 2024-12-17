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
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'O CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX')
    .min(18, 'O CNPJ da empresa deve ter 14 números e dois separadores')
    .max(18, 'O CNPJ da empresa deve ter 14 números e dois separadores'),

  phone: yup.string()
  .required('O telefone é obrigatório')
  .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'O telefone deve estar no formato (XX) XXXXX-XXXX')
  .test('has-valid-length', 'O telefone deve ter 11 números incluindo o DD', value => {
    const numbersOnly = value.replace(/\D/g, '');
    return numbersOnly.length === 11;
  }),

  postal_code: yup.string()
    .required('O CEP é obrigatório')
    .matches(/^\d{5}-\d{3}$/, 'O CEP deve estar no formato XXXXX-XXX')
    .test('has-valid-length', 'O CEP deve ter 8 números', value => {
      const numbersOnly = value.replace(/\D/g, '');
      return numbersOnly.length === 8;
    }),
  
  city: yup.string()
    .required('A cidade do cliente é obrigatório')
    .min(3, 'A cidade do cliente deve ter pelo menos 3 caracteres'),

  street: yup.string()
    .required('A rua do cliente é obrigatório')
    .min(3, 'A rua do cliente deve ter pelo menos 3 caracteres'),

  state: yup.string()
    .required('O estado do cliente é obrigatório')
    .min(2, 'O estado do cliente deve ter pelo menos 3 caracteres'),

  neighborhood: yup.string()
    .required('O bairro do cliente é obrigatório')
    .min(3, 'O bairro do cliente deve ter pelo menos 3 caracteres'),

  number: yup.number()
    .required('O número da casa do cliente é obrigatório')
    .min(3, 'O número da casa do cliente deve ter pelo menos 3 caracteres'),
    
  complement: yup.string()
    .required('O complemento do cliente é obrigatório')
    .min(3, 'O complemento do cliente deve ter pelo menos 3 caracteres'),
});