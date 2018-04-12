import { Component } from '@angular/core';

@Component({
  selector: 'budgets-tab',
  templateUrl: 'budgets-tab.html'
})
export class BudgetsTabComponent {
  // pie
  colorScheme = {
    domain: ['#ff8ba4', '#86c7f3', '#ffe29a', '#AAAAAA']
  };
  showLabels = false;
  explodeSlices = false;
  doughnut = false;
  view: any[] = [180, 180];

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

  constructor() {
    
  }

  onSelect(event) {
    console.log(event);
  }
}