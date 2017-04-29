import {Config} from "./config"
export class App {
  /**
   * Get the current time
   */
  constructor() {
      setInterval(this.updateTime.bind(this),500);
  }

  configureRouter(config,router) {
    config.title = 'Repair Cafe Manager';
    config.map([
      { route: '',  moduleId: 'home', name: "home" },
      { route: 'repairs',  moduleId: 'repairs/repair-list', title: "Repair List", name: "repair-list" },
      { route: 'repairs/add',  moduleId: 'repairs/repair-add',  title: "Add a Repair", name: "repair-add" },
      { route: 'repairs/:id',  moduleId: 'repairs/repair-update', title: "Edit a Repair", name: "repair-update" }
    ]);
    this.router = router;
  }
  /**
   * A function for displaying the current time
   */
  updateTime() {
      var tmp = ""+ new Date();
      console.log(tmp);
      tmp = tmp.replace(/[A-Z]{3}-\d{4}/,"");//.replace(/20\d{2}/, "");
    this.date = tmp;
  }
}
