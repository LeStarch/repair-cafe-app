import {RepairAPI} from "../repair-api";
import {Config} from "../config";
import {Repair} from "../models/repair"

export class RepairAdd {

  constructor() {
    this.types = Config.types;
    //Data bindings
    this.name = "";
    this.email = "";
    this.type = "";
  }

  created() { }

  addRepair() {
    if (this.name == "" || this.email == "" || this.type == "") {
        return;
    }
    var repair = new Repair(this.name,this.email,this.type);
    RepairAPI.getNextId(this.type).then( id => {
        repair.id = this.type +"-" +id;
        RepairAPI.saveRepair(repair);
    });

    this.name = "";
    this.email = "";
  }
}
