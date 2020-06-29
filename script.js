const botaoExcluiItems = document.querySelector('.empty-cart');

const salvaCarrinho = () => {
  const carrinhoSalvo = document.getElementsByTagName('ol')[0].innerHTML;
  localStorage.setItem('carrinho', carrinhoSalvo);
};

const limparCarrinho = () => {
  document.getElementsByTagName('ol')[0].innerHTML = '';
  localStorage.setItem('carrinho', '');
};

botaoExcluiItems.addEventListener('click', limparCarrinho);
/*
const somaPrice = () => {
  const total = 0;
}
*/
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  // const itemExcluido = event.target.parent;
  const itemExcluido = event.target;
  // pega carrinho e exclui item clicado
  const carrinhoDeCompras = document.getElementsByTagName('ol')[0];
  carrinhoDeCompras.removeChild(itemExcluido);
  salvaCarrinho();
}
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  // faz uma requição do produto selecionado a API
  fetch(`https://api.mercadolibre.com/items/${item}`)
  .then(response => response.json())
  .then(function (produtoAdicionado) {
    // cria as informacoes do produto selecionado que serao exibidas
    const { id: sku, title: name, price: salePrice } = produtoAdicionado;
    // anexando o produto escolhido dentro do carrinho
    const itemDoCarrinho = document.getElementsByTagName('ol')[0];
    itemDoCarrinho.appendChild(createCartItemElement({ sku, name, salePrice }));
    salvaCarrinho();
  });
  // return item.querySelector('span.item__sku').innerText;
}

function createProductItemElement({ sku, name, image }) {
  //
  const items = document.getElementsByClassName('items')[0];
  const section = document.createElement('section');
  //
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const div = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  //
  div.addEventListener('click', () => getSkuFromProductItem(sku));
  section.appendChild(div);
  items.appendChild(section);
  // return items;
}

const source = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

fetch(source)
  .then(response => response.json())
  .then(function (object) {
    object.results.map(function (product) {
      //  quebrando os dados recebido em informacoes do produto
      const { id: sku, title: name, thumbnail: image } = product;
      // produto --codigo -----nome ---------- foto
      // passando os parametros para a funcao para personalizar
      return createProductItemElement({ sku, name, image });
    });
  });

window.onload = function onload() {
  document.getElementsByTagName('ol')[0].innerHTML = localStorage.getItem('carrinho');
  if (localStorage.getItem('carrinho') !== undefined) {
    const excluiItem = document.getElementsByClassName('cart__item');
    Array.from(excluiItem).forEach(item => item.addEventListener('click', cartItemClickListener));
  }
};
// const Carrinho = cartItemClickListener(evento)
// getSkuFromProductItem(item);
// createCartItemElement({ sku, name, salePrice });
