import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const sectionProducts = document.querySelector('.products');

const loadingElement = document.createElement('div');
loadingElement.classList.add('loading');
loadingElement.innerHTML = 'carregando...';
sectionProducts.appendChild(loadingElement);
try {
  const data = await fetchProductsList('computador');

  const getLoading = document.querySelector('.loading');
  getLoading.remove();

  data.forEach((element) => {
    const product = createProductElement(element);
    sectionProducts.appendChild(product);
  });
} catch (error) {
  const errorElement = document.createElement('div');
  const msgError = 'Algum erro ocorreu, recarregue a página e tente novamente';
  errorElement.classList.add('error');
  errorElement.innerHTML = msgError;
  sectionProducts.appendChild(errorElement);
}

// data.forEach((element) => {
//   createProductElement(element);
// });
