import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    const API = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(API);
  });

  it('Retorno da função fetchProductsList("computador") é igual a estrutura de dados do objeto computadorSearch', async () => {
    const response = await fetchProductsList('computador');
    expect(response).toEqual(computadorSearch);
  });

  it('Retorno da função fetchProductsList() retorna um erro com a mensagem "Termo de busca não informado"', async () => {
    const msgErro = 'Termo de busca não informado';
    // const response = 
    // const data = response.json();
    await expect(fetchProductsList()).rejects.toThrowError(msgErro);
  });
});
