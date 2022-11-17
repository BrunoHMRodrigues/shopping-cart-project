export const getAddress = async (CEP) => {
  const API1 = `https://cep.awesomeapi.com.br/json/${CEP}`;
  const API2 = `https://brasilapi.com.br/api/cep/v2/${CEP}`;
  const promises = [fetch(API1), fetch(API2)];
  try {
    const result = await Promise.any(promises).then((response) => response.json());
    return result;
  } catch (error) {
    return error;
  }
};

export const searchCep = async (CEP) => {
  const data = await getAddress(CEP);
  if (!data.status) {
    const address = data.address ? data.address : data.street;
    const district = data.district ? data.district : data.neighborhood;
    const { city, state } = data;
    const result = `${address} - ${district} - ${city} - ${state}`;
    return result;
  }
};
