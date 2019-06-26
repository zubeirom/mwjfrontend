/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
import Controller from '@ember/controller';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({

    toastr: service('toast'),
    media: service(),

    setup(model) {
        model.forEach(doc => {
            set(doc, 'formatDate', []);
            let dates = doc.dates;
            dates.forEach(d => {
                let f = new Date(d);
                let a = f.getMonth();
                doc.formatDate.pushObject(a);
            });

            set(this, "chartData", {
                labels: doc.formatDate,
                datasets: [
                    {
                        label: "Weight-Progress -  Numbers stand for month",
                        backgroundColor: "rgba(54,162,235,0.2)",
                        borderColor: "rgba(54,162,235,0.8)",
                        data: doc.weights
                    }
                ]
            })
        });
    },

    chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Weight-Progress",
            backgroundColor: "rgba(54,162,235,0.2)",
            borderColor: "rgba(54,162,235,0.8)",
            data: []
          }
        ]
    },

    lineOptions: { // ADDED
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                }
            }]
        }
    },

    newWeight: "",
    
    actions: {
        addNewWeight() {
            if(this.newWeight !== "" || NaN(this.newWeight) !== true) {
                this.model.forEach(async doc => {
                    doc.weights.pushObject(parseInt(this.newWeight));
                    doc.dates.pushObject(Date.now());
                    this.toastr.success('Successfully added new weight', 'Success');
                    set(this, 'newWeight', '');
                    await doc.save();
                    set(this, "chartData", {
                        labels: doc.formatDate,
                        datasets: [
                            {
                                label: "Weight-Progress -  Numbers stand for month",
                                backgroundColor: "rgba(54,162,235,0.2)",
                                borderColor: "rgba(54,162,235,0.8)",
                                data: doc.weights
                            }
                        ]
                    })
                });
            }else {
                this.toastr.error('Please enter valid number', 'Error');
            }
        }
    }

    
});
