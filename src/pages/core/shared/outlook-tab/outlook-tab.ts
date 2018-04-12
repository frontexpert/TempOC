import { Component, Input } from '@angular/core';

@Component({
  selector: 'outlook-tab',
  templateUrl: 'outlook-tab.html'
})
export class OutlookTabComponet {
  @Input() pratica: any;

  items: any = [];
  itemExpandHeight: number = 100;

  constructor() {
    this.items = [
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false}
    ];
  }

  expandItem(item){
 
    this.items.map((listItem) => {

        if(item == listItem){
            listItem.expanded = !listItem.expanded;
        } else {
            listItem.expanded = false;
        }

        return listItem;

    });

  }
}