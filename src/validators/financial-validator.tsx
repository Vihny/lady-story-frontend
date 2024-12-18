import * as yup from 'yup';

export const schema = yup.object().shape({
  operation_date: yup.date()
    .required('A data é obrigatório')
    .min(3, 'A data deve ter pelo menos 3 caracteres'),

  operation_type: yup.string()
    .required('O tipo é obrigatório')
    .oneOf(['1', '2'], 'Selecione um tipo válido'),

  value: yup.string()
    .required('O valor é obrigatório')
    .matches(/^\d+(\.\d{3})*(,\d{2})?$/, 'O valor deve estar no formato R$ X.XXX,XX')
    .test('is-valid-money', 'O valor deve estar no formato R$ X.XXX,XX', (value) => {
      if (value) {
        const sanitizedValue = value.replace(/[^\d,.-]/g, '').replace(',', '.');
        return /^[0-9]{1,3}(\.[0-9]{3})*(,\d{2})?$/.test(sanitizedValue);
      }
      return false;
    }),

  description: yup.string()
    .required('A descrição é obrigatório')
    .min(3, 'A descrição deve ter pelo menos 3 caracteres'),

  sale_id: yup.number()
    .required('A observação é obrigatório')
});