import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';
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

// const buttonsAddCart = document.querySelectorAll('.product__add');
const cart = document.querySelector('.cart__products');

sectionProducts.addEventListener('click', async (event) => {
  if (event.target.className === 'product__add') {
    const targetElement = event.target;
    const idElement = targetElement.parentNode.firstChild.innerText;
    saveCartID(idElement);
    const dataProduct = await fetchProduct(idElement);
    const productToCart = createCartProductElement(dataProduct);
    cart.appendChild(productToCart);
  }
});
