import {TEMPLATE} from "./basic.template.js";

export let COMPONENT = {
    template: TEMPLATE,
    inject: ["repairs", "config"],
    data() {
        return {};
    },
    computed: {
        chart() {
            let self = this;
            this.$nextTick(() => {
                let element = document.getElementById("donut");
                new Chart(element, {
                    type: 'doughnut',
                    data: {
                        labels: ['Fixed', 'Could Not Fix', 'Consultation', 'No Time', "In-Progress"],
                        datasets: [{
                            label: '# of Repairs',
                            data: [
                                this.repairsAt('fixed'),
                                this.repairsAt('unfixable'),
                                this.repairsAt('consulted'),
                                this.repairsAt('no-time'),
                                this.repairsBefore(6)
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            });
            return "" + this.repairs.length;
        }
    },
    methods: {
        repairsAt(state) {
            let _self = this;
            return _self.repairs.filter((repair) => {
                return repair.states[repair.stateIndex].name == state;
            }).length;
        },
        repairsBefore(state_numerical) {
            let _self = this;
            return _self.repairs.filter((repair) => {
                return repair.stateIndex < state_numerical;
            }).length;
        }
    }
}