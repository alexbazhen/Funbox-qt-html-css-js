import AppView from "./view/appView";

class App {
  constructor() {
    this.view = new AppView();
  }

  start() {
    this.view.init();
  }
}

export default App;