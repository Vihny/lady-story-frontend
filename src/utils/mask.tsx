export const applyMask = (value: string, type: 'cnpj' | 'cpf' | 'phone' | 'cep' | 'price'): string => {
    switch (type) {
      case 'cnpj':
        return value
          .replace(/\D/g, '')
          .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
      case 'phone':
        return value
          .replace(/\D/g, '')
          .replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      case 'cep':
        return value
          .replace(/\D/g, '')
          .replace(/^(\d{5})(\d{3})$/, '$1-$2');
      case 'cpf':
        return value
            .replace(/\D/g, '')
            .replace(/^(\d{3})(\d{0,3})(\d{0,3})(\d{0,2})$/, '$1.$2.$3-$4');
      case 'price':
        return value
          .replace(/\D/g, '')
          .replace(/^0+/, '')
          .replace(/(\d)(\d{2})$/, '$1,$2')
          .replace(/(?=(\d{3})+(\D))\B/g, '.'); 
      default:
        return value;
    }
};
  