import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const sectionProducts = document.querySelector('.products');
const cart = document.querySelector('.cart__products');
const totalValue = document.querySelector('.total-price');

async function addToCart(idProduct) {
  const dataProduct = await fetchProduct(idProduct);
  const productToCart = createCartProductElement(dataProduct);
  return productToCart;
}

function getSavedCart() {
  const savedCartProducts = getSavedCartIDs();
  Promise.all(savedCartProducts.map((idProduct) => addToCart(idProduct)))
    .then((values) => {
      values.forEach((element) => {
        const lengthInitial = cart.children.length;
        cart.appendChild(element);
        const lengthAfter = cart.children.length;
        if (lengthAfter > lengthInitial) {
          const value = Number(element.children[1].children[1].children[0].innerHTML);
          totalValue.innerHTML = Number(totalValue.innerHTML) + value;
        }
      });
    });
}

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
  getSavedCart();
} catch (error) {
  const errorElement = document.createElement('div');
  const msgError = 'Algum erro ocorreu, recarregue a página e tente novamente';
  errorElement.classList.add('error');
  errorElement.innerHTML = msgError;
  sectionProducts.appendChild(errorElement);
}

sectionProducts.addEventListener('click', async (event) => {
  if (event.target.className === 'product__add') {
    const targetElement = event.target;
    const idElement = targetElement.parentNode.firstChild.innerText;
    saveCartID(idElement);
    cart.innerHTML = '';
    totalValue.innerHTML = 0;
    getSavedCart();
  }
});

cart.addEventListener('click', () => {
  cart.innerHTML = '';
  totalValue.innerHTML = 0;
  getSavedCart();
});

const btnCEP = document.querySelector('.cep-button');
const cepInput = document.querySelector('.cep-input');

btnCEP.addEventListener('click', async () => {
  const spanAddress = document.querySelector('.cart__address');
  const cepValue = cepInput.value;
  console.log(cepValue);
  const lengthCEP = 8;
  if (!Number(cepValue)) {
    const errorMessage = 'CEP não encontrado';
    spanAddress.innerHTML = errorMessage;
    return;
  }
  if (cepValue.length === lengthCEP) {
    const result = await searchCep(cepValue);

    if (!result) {
      const errorMessage = 'CEP não encontrado';
      spanAddress.innerHTML = errorMessage;
    } else {
      spanAddress.innerHTML = result;
    }
  }
});
