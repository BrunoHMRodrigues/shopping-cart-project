export const getAddress = async (CEP) => {
  const API1 = `https://cep.awesomeapi.com.br/json/${CEP}`;
  const API2 = `https://brasilapi.com.br/api/cep/v2/${CEP}`;
  const promises = [fetch(API1), fetch(API2)];
  try {
    const response = await Promise.any(promises);
    // console.log(response);
    const result = await response.json();
    console.log(result, 'RESULT');
    return result;
  } catch (error) {
    console.log(error, 'ERROOOOOOOO');
  }

  // console.log(result);
  // const responseCEP1 = await fetch(API1);
  // const data1 = await responseCEP1.json();
  // return data1;
  // const responseCEP2 = await fetch(API2);
  // const data2 = await responseCEP1.json();
  // const promises = [CEP1, CEP2];
  // const result = await Promise.any(promises).catch(() => 'CEP não encontrado');
};

export const searchCep = async (CEP) => {
  const data = await getAddress(CEP);
  console.log(data, 'endereço');
  // if (data) {
  const address = data.address ? data.address : data.street;
  const district = data.district ? data.district : data.neighborhood;
  const { city, state } = data;
  const result = `${address} - ${district} - ${city} - ${state}`;
  // return result;
  // }
  // const error = 'CEP não encontrado';
  // console.log(error, 'ERROR');
  if (!address || !district || !city || !state) {
    const error = 'CEP não encontrado';
    return error;
  }
  return result;
};
