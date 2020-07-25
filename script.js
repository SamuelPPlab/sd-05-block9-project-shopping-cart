function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

const remove = document.querySelector('.empty-cart');
function removerItens() {
  document.getElementsByClassName('cart__items')[0].innerHTML = '';
  localStorage.setItem('cart', '');
}
remove.addEventListener('click', removerItens);

function refreshLocalStorage() {
  const ol = document.querySelector('.cart__items');
  localStorage.setItem('cart', ol.innerHTML);
}
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  const click = event.target;
  click.remove();
  refreshLocalStorage();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
function idProducts(item) {
  const ol = document.querySelector('.cart__items');
  const url = `https://api.mercadolibre.com/items/${item}`;
  fetch(url)
  .then(response => response.json())
  .then(function (clickButton) {
    const { id: sku, title: name, price: salePrice } = clickButton;
    ol.appendChild(createCartItemElement({ sku, name, salePrice }));
    refreshLocalStorage();
  });
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  const selectItems = document.getElementsByClassName('items')[0];
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addEvent = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addEvent.addEventListener('click', () => idProducts(sku));
  section.appendChild(addEvent);
  selectItems.appendChild(section);
  refreshLocalStorage();
  return section;
}

const url2 =
  'https://api.mercadolibre.com/sites/MLB/search?q=computador';

window.onload = function onload() {
  setTimeout(() => {
    document.querySelector('.loading').remove();
  }, 3000);
  if (localStorage.getItem('cart') !== null) {
    document.getElementsByTagName('ol')[0].innerHTML = localStorage.getItem('cart');
    const receber = document.querySelectorAll('.cart__item');
    receber.forEach((loading) => {
      loading.addEventListener('click', cartItemClickListener);
    });
  }
  fetch(url2)
    .then(response => response.json())
    .then(function (obj) {
      obj.results.map((objProducts) => {
        const { id: sku, title: name, thumbnail: image } = objProducts;
        return createProductItemElement({ sku, name, image });
      });
    });
};
