import * as yup from 'yup';

export const schema = yup.object().shape({
    name: yup.string()
      .required('O nome do cliente é obrigatório')
      .min(3, 'O nome do cliente deve ter pelo menos 3 caracteres'),

    email: yup.string()
      .required('O e-mail é obrigatório')
      .email('Digite um e-mail válido'),

    birthdate: yup.date()
      .required('A data de nascimento do cliente é obrigatório'),

    cpf: yup.string()
      .required('O CPF do cliente é obrigatório')
      .max(11)
      .min(11, 'O CPF do cliente deve conter 11 números'),

    phone: yup.string()
      .required('O telefone do cliente é obrigatório')
      .max(11, 'O telefone do cliente deve conter 9 digitos + o DD'),

    postal_code: yup.string()
      .required('O CEP do cliente é obrigatório')
      .max(8, 'O CEP do cliente deve conter 8 números'),

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