import './styles/style.scss';

import products from './shop/packs';
class Catalog {
  constructor() {
    this.elem = document.querySelector('.catalog') ?? document.body;
    this.products = [];
  }
  init() {
    if (!products) throw new Error('No database of products');
    this.clear();
    products.forEach(product => {
      const pack = new Pack(product.flavour, product.label, product.inStock, product.weight, product.call, product.feature);
      const card = document.createElement('li');
      card.classList.add('card', 'catalog__card');
      card.append(pack.create());
      card.append(pack.call);
      this.products.push(card);
    });
    console.log('Products is getted');
    this.addCards();
    return;
  }
  addCards() {
    this.products.forEach(product => {
      this.elem.append(product);
    });
  }
  clear() {
    if (!this.elem.querySelector('li')) throw new Error('Nothing delete');
    this.elem.querySelectorAll('li').forEach(product => product.remove());
  }
}
class Pack {
  constructor(flavour, label, inStock, weight, call, feature) {
    this.flavour = flavour;
    this.labelText = label;
    this.weight = weight.toString();
    this.feature = feature ?? '';
    this.inStock = inStock;
    this.callText = call;
    this.article = document.createElement('article');
    this.call = document.createElement('p');
    this.label = document.createElement('blockquote');

    this.isSelect = false;

    this.isDisable();
  }
  create() {
    this.article.classList.add('pack', 'card__pack');
    this.call.classList.add('call', 'card__call');
    this.label.classList.add('pack__label');
    this.label.innerText = this.labelText;

    const thisFeature = this.feature;
    const features = () => {
      if (thisFeature === '') return '';
      let featureElem = ['<ul class="feature pack__feature">\n'];

      thisFeature.forEach(el => { // '5 мышей в подарок'
        const strArr = el.split(' '); // ['5', 'мышей', 'в', 'подарок']
        const changeArr = strArr.map((el) => {
          if (!isNaN(+el)) { // If el is number
            return `<span class="feature__num">${el}</span>`;
          } else return el;
        });
        featureElem.push(`<li class="feature__item">${changeArr.join(' ')}</li>\n`)
      });

      featureElem.push('</ul>')
      const res = featureElem.join('');
      return res;
    }

    this.article.innerHTML = `
      <h3 class="pack__name">Нямушка <span class="pack__flavour">${this.flavour}</span></h3>
      ${features()}
      <p class="weight pack__weight">
        <span class="weight__value">${this.weight}</span>кг
      </p>
      <div class="pack__image">
        <img src="img/pack/cat.png" alt="Фото послушного котика, который любит нямушку" class="pack__img">
      </div>`;

    this.article.querySelector('h3').after(this.label); // Insert label after h3
    this.call.innerHTML = `Чего сидишь? Порадуй котэ, <button class="call__btn">купи.</button>`;
    if (this.inStock <= 0) {
      this.changeCall(`Печалька, ${this.flavour} закончился.`);
    }

    return this.article;
  }
  select() {
    if (this.article.classList.contains('pack_selected')) {
      this.resetSelect();
    } else {
      this.article.classList.add('pack_selected');
      this.changeCall(this.callText); 
      this.isSelect = true;
    }
  }
  isDisable() {
    if (this.inStock <= 0) {
      this.article.classList.add('pack_disabled');
    } else {
      this.events();
    }
  }
  resetSelect() {
    this.article.classList.remove('pack_selected');
    if (this.article.classList.contains('pack_selected-hover')) {
      this.article.classList.remove('pack_selected-hover');
    }
    this.changeCall();
    this.isSelect = false;
    this.isMouseLeave = false;
    this.changeLabel();
  }
  changeCall(option) {
    if (!option) {
      this.call.innerHTML = `Чего сидишь? Порадуй котэ, <button class="call__btn">купи.</button>`;
    } else {
      console.log(option);
      console.log(this.call)
      this.call.innerText = option; 
    }
  }
  changeLabel(option) {
    if (!option) {
      this.label.innerText = this.labelText;
    } else {
      this.label.innerText = 'Котэ не одобряет?';
    }
  }

  events() {
    this.article.addEventListener('click', (e) => {
      this.select();
    });
    this.article.addEventListener('mouseleave', (e) => {
      if (this.isSelect) {
        this.article.classList.add('pack_selected-hover');
        this.changeLabel(true);
        return;
      }
    });
    this.article.addEventListener('mouseenter', (e) => {
      if (this.isSelect) {
        this.article.classList.remove('pack_selected-hover');
        this.changeLabel();
        return;
      }
    });
  }
}

const app = new Catalog();
app.init();
