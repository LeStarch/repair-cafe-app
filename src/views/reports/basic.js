import {TEMPLATE} from "./basic.template.js";

function mean(array) {
    let filtered = array.filter((x) => x != null);
    if (filtered.length == 0) {
        return "N/A";
    }
    return Math.round(filtered.reduce((a, b) => a + b, 0) / filtered.length / 60000);
}

function median(array) {
    let filtered = array.filter((x) => x != null).sort((a, b) => a - b);
    if (filtered.length == 0) {
        return "N/A";
    }
    let mid = Math.floor(filtered.length / 2);
    if (filtered.length % 2 == 0) {
        return Math.round((filtered[mid - 1] + filtered[mid]) / 2 / 60000);
    } else {
        return Math.round(filtered[mid] / 60000);
    }
}

export let COMPONENT = {
    template: TEMPLATE,
    inject: ["config"],
    props: ["title", "repairs"],
    data() {
        return {
            "chart_object": null,
        };
    },
    computed: {
        chart() {
            this.$nextTick(() => {
                let element = this.$el.querySelector(".donut");
                this.chart_object = new Chart(element, {
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
        },
        waits() {
            return this.repairs.map(
                (repair) => {
                    try {
                        // Time in "check-in" state 
                        if (time != 0) {
                            return Math.abs(repair.states[1].time);
                        } else {
                            return null;
                        }
                    } catch (e) {
                        return null;
                    }
                }
            );
        },
        totals() {
            return this.repairs.map(
                (repair) => {
                    try {
                        // Time in "triage" and future states
                        return Math.abs(
                            repair.states.reduce((total, state, index) => {
                                if (index >= 2) {
                                    return total + state.time;
                                } else {
                                    return total;
                                }
                            }, 0)
                        );
                    } catch (e) {
                        return null;
                    }
                }
            );
        },
        meanWait() {
            return mean(this.waits);
        },
        meanTotal() {
            return mean(this.totals);
        },
        medianWait() {
            return median(this.waits);
        },
        medianTotal() {
            return median(this.totals);
        },
    },
    watch: {
        repairs() {
            if (this.chart_object != null) {
                this.chart_object.destroy();
                this.chart_object = null;
            }
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