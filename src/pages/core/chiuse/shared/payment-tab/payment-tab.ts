import { Component, Input } from '@angular/core';

import { PracticesProvider } from '../../../../../providers/practices/practices';
import { Globals } from '../../../../../shared/globals';


@Component({
  selector: 'payment-tab',
  templateUrl: 'payment-tab.html'
})
export class PaymentTabComponet {
  @Input() id: number;

  praticaPayment: any;

  // pie
  colorScheme = {
    domain: ['#ff8ba4', '#86c7f3', '#ffe29a', '#AAAAAA']
  };
  showLabels = false;
  explodeSlices = false;
  doughnut = false;
  view: any[] = [130, 130];

  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }
  ];

  constructor(private _practice: PracticesProvider, public globals: Globals) {
  }

  ngOnInit(): void {    
    this.getPaymentDetails();
  }

  private getPaymentDetails() {
    // loading pratica details
    this._practice.getPaymentDetails(this.id)
      .then(res => {
        this.praticaPayment = res;
      })
      .catch(err => {
        console.log('ERROR: ', err);
      });    
  }

  onSelect(event) {
    console.log(event);
  }
}