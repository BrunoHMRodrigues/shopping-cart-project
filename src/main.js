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
  //   console.log('product: ' + dataProduct.price);
  //   const { price } = dataProduct.price;
  //   console.log('price: ' + dataProduct.price);
  return productToCart;
//   cart.appendChild(productToCart);
}

function getSavedCart() {
  const savedCartProducts = getSavedCartIDs();
  //   console.log('saved: ' + savedCartProducts);
  Promise.all(savedCartProducts.map((idProduct) => addToCart(idProduct)))
    .then((values) => {
      // console.log('values: ' + values);
      values.forEach((element) => {
        const lengthInitial = cart.children.length;
        // console.log('lengthinitial: ' + lengthInitial);
        cart.appendChild(element);
        const lengthAfter = cart.children.length;
        // console.log('lengthinitialNEW: ' + lengthInitial);
        // console.log('lengthafter: ' + lengthAfter);
        if (lengthAfter > lengthInitial) {
        //   console.log('entrou');
          const totalValue = document.querySelector('.total-price');
          // console.log(Number(element.children[1].children[1].children[0].innerHTML));
          const value = Number(element.children[1].children[1].children[0].innerHTML);
          console.log(value);
          totalValue.innerHTML = Number(totalValue.innerHTML) + value;
        //   console.log('Total: ' + totalValue.innerHTML);
        }
      });
    });
}

try {
  const data = await fetchProductsList('computador');

  const getLoading = document.querySelector('.loading');
  getLoading.remove();

  data.forEach((element) => {
    const product = createProductElement(element);
    sectionProducts.appendChild(product);
  });
  getSavedCart();

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
const totalValue = document.querySelector('.total-price');
const cartContainer = document.querySelector('.cart__products');

sectionProducts.addEventListener('click', async (event) => {
  if (event.target.className === 'product__add') {
    const targetElement = event.target;
    const idElement = targetElement.parentNode.firstChild.innerText;
    saveCartID(idElement);
    cartContainer.innerHTML = '';
    totalValue.innerHTML = 0;
    getSavedCart();
    // // const dataProduct = await fetchProduct(idElement);
    // // console.log(dataProduct);
    // // console.log('idelement: ' + idElement);
    // const getProductData = await addToCart(idElement);
    // // console.log('getProductData: ' + getProductData[0]);
    // // totalValue.innerHTML = Number(totalValue.innerHTML) + 10;
    // const lengthInitial = cart.children.length;
    // cart.appendChild(getProductData);
    // const lengthAfter = cart.children.length;
    // if (lengthAfter > lengthInitial) {
    //   // console.log(Number(getProductData.children[1].children[1].children[0].innerHTML));
    //   const value = Number(getProductData.children[1].children[1].children[0].innerHTML);
    //   // console.log('actual: ' + value);
    //   totalValue.innerHTML = Number(totalValue.innerHTML) + value;
    // }
  }
});

cartContainer.addEventListener('click', (event) => {
  // console.log(event.target);
  if (event.target.className === 'material-icons cart__product__remove') {
    // console.log('entrou2');
    cartContainer.innerHTML = '';
    totalValue.innerHTML = 0;
    getSavedCart();
  }
});

const btnCEP = document.querySelector('.cep-button');
const cepInput = document.querySelector('.cep-input');

btnCEP.addEventListener('click', async () => {
  const cepValue = cepInput.value;
  const lengthCEP = 8;
  if (cepValue.length === lengthCEP) {
    // const CEP = document.querySelector('.cep-input');
    const address = await searchCep(cepValue);
    const spanAddress = document.querySelector('.cart__address');
    spanAddress.innerHTML = address;
  }
});
