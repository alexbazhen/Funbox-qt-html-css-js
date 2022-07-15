import Catalog from "./shop/catalog";

class AppView {
  constructor() {
    this.catalog = new Catalog();
  }
  init() {
    this.catalog.init();
  }
}

export default AppView;