class LoaderProducts {
  constructor(filename) {
    this.baseLink = window.location.hostname != 'localhost' ? window.location.href : `${window.location.protocol}//${window.location.host}/`;
    this.pathToProducts = `data/${filename}`;
  }

  async load() {
    try {
      const response = await fetch(this.baseLink + this.pathToProducts);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default LoaderProducts;