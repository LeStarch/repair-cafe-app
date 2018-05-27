import {RepairAPI} from "../repair-api";
import {Config} from "../config";
import {Repair} from "../models/repair"

export class RepairAdd {

  constructor() {
    this.types = Config.types;
    this.providers = Object.keys(Config.PROV_MAP);
    //Data bindings
    this.name = "";
    this.email = "";
    this.type = "";
    this.lastTicket = "";
    this.reservation = "none";
    this.phone = "";
    this.provider = "";
  }

  created() { }

  addRepair() {
    if (this.name == "" || this.email == "" || this.type == "") {
        return;
    }
    var repair = new Repair(this.name,this.email,this.type,this.reservation,this.phone,this.provider);
    RepairAPI.getNextId(this.type).then( id => {
        repair.id = this.type +"-" +id;
        RepairAPI.saveRepair(repair);
        this.lastTicket = repair.id;
    });
    $("#ticket-modal").modal();
    this.name = "";
    this.email = "";
    this.reservation = "none";
  }
}
