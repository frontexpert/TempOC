import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';


@Component({
  selector: 'payment-tab',
  templateUrl: 'payment-tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentTabComponet {
  @Input() paymentDetails: any;

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

  constructor(private ref: ChangeDetectorRef) {
  }

  // Wait until the view inits before disconnecting
  ngAfterViewInit() {
    // Since we know the list is not going to change
    // let's request that this component not undergo change detection at all
    this.ref.detach();
  }

  onSelect(event) {
    console.log(event);
  }
}