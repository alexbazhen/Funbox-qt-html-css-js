import LoaderProducts from "../../controller/loaderProducts";
import Pack from "./product/pack";

class Catalog {
  constructor() {
    this.elem = document.querySelector('.catalog') ?? document.body;
    this.data = new LoaderProducts('packs.json');
    this.products = [];
  }
  async init() {
    try {
      const data = await this.data.load();
      if (!data) throw new Error('No database of products');
      this.clear();
      data.forEach(product => {
        const pack = new Pack(product.flavour, product.label, product.inStock, product.weight, product.call, product.feature);
        const card = document.createElement('li');
        card.classList.add('card', 'catalog__card');
        card.append(pack.create());
        card.append(pack.call);
        this.products.push(card);
      });
      this.addCards();
    } catch (error) {
      throw new Error(error);
    }  
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

export default Catalog;