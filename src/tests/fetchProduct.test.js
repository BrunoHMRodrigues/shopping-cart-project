import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    const API = 'https://api.mercadolibre.com/items/MLB1405519561'
    expect(fetch).toHaveBeenCalledWith(API);
  });

  it('Retorno da função fetchProduct("MLB1405519561") é uma estrutura igual ao objeto product', async () => {
    const response = await fetchProduct('MLB1405519561');
    expect(response).toEqual(product);
  });

  it('Retorno da função fetchProduct() retorna um erro com a mensagem "ID não informado"', async () => {
    const msgError = 'ID não informado';
    await expect(fetchProduct('MLB1405519561')).rejects.toThrowError(msgError);
  });
});
