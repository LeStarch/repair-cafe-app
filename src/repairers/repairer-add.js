import {RepairerAPI} from "../database/repairer-api";
import {Config} from "../config";
import {Repairer} from "../models/repairer"

export class RepairerAdd {

  constructor() {
    this.all_skills = Config.skills;
    //Data bindings
    this.name = "";
    this.email = "";
    this.skills = {};
  }

  created() { }

  addRepairer() {
    if (this.name == "" || this.email == "") {
        return;
    }
    var tmp = [];
    for (var skill in this.skills) {
        if (this.skills[skill]) {
            tmp.push(skill);
        }
    }
    var repairer = new Repairer(this.name,this.email,tmp);
    RepairerAPI.getNextId().then( id => {
        repairer.id = "repairer-" +id;
        RepairerAPI.saveRepairer(repairer);
    });

    this.name = "";
    this.email = "";
  }
}
