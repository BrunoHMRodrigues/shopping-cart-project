export const getAddress = async (CEP) => {
  const API1 = `https://cep.awesomeapi.com.br/json/${CEP}`;
  const API2 = `https://brasilapi.com.br/api/cep/v2/${CEP}`;
  const result = await Promise.any([fetch(API1), fetch(API2)])
    .then((resolve) => resolve.json());
    // .catch((error) => console.log('deu erro'));
  return result;
};

export const searchCep = async (CEP) => {
  const data = await getAddress(CEP);
  const { address, district, city, state } = data;
  const result = `${address} - ${district} - ${city} - ${state}`;
  return result;
};
