import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const sectionProducts = document.querySelector('.products');

const loadingElement = document.createElement('div');
loadingElement.classList.add('loading');
loadingElement.innerHTML = 'carregando...';
sectionProducts.appendChild(loadingElement);

const cart = document.querySelector('.cart__products');

async function addToCart(idProduct) {
//   console.log(idProduct);
  const dataProduct = await fetchProduct(idProduct);
  //   console.log('id: ' + dataProduct.id);
  const productToCart = createCartProductElement(dataProduct);
  return productToCart;
//   cart.appendChild(productToCart);
}

try {
  const data = await fetchProductsList('computador');

  const getLoading = document.querySelector('.loading');
  getLoading.remove();

  data.forEach((element) => {
    const product = createProductElement(element);
    sectionProducts.appendChild(product);
  });
  const savedCartProducts = getSavedCartIDs();
  //   console.log('saved: ' + savedCartProducts);
  Promise.all(savedCartProducts.map((idProduct) => addToCart(idProduct)))
    .then((values) => {
      values.forEach((element) => cart.appendChild(element));
    });

//   savedCartProducts.forEach(async (idProduct) => {
//     await addToCart(idProduct);
//   });
} catch (error) {
  const errorElement = document.createElement('div');
  const msgError = 'Algum erro ocorreu, recarregue a página e tente novamente';
  errorElement.classList.add('error');
  errorElement.innerHTML = msgError;
  sectionProducts.appendChild(errorElement);
}

// const buttonsAddCart = document.querySelectorAll('.product__add');

sectionProducts.addEventListener('click', async (event) => {
  if (event.target.className === 'product__add') {
    const targetElement = event.target;
    const idElement = targetElement.parentNode.firstChild.innerText;
    saveCartID(idElement);
    // const dataProduct = await fetchProduct(idElement);
    // console.log(dataProduct);
    // console.log('idelement: ' + idElement);
    const getProductData = await addToCart(idElement);
    // console.log('getProductData: ' + getProductData);
    cart.appendChild(getProductData);
  }
});
