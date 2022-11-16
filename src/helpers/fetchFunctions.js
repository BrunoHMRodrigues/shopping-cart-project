export const fetchProduct = async (idProduct) => {
  if (!idProduct) {
    throw new Error('ID não informado');
  }
  const API = `https://api.mercadolibre.com/items/${idProduct}`;
  const response = await fetch(API);
  const data = await response.json();
  return data;
};

export const fetchProductsList = async (search) => {
  if (!search) {
    throw new Error('Termo de busca não informado');
  }
  const API = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
  const response = await fetch(API);
  const data = await response.json();
  return data.results;
};
