import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'outlook-tab',
  templateUrl: 'outlook-tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutlookTabComponet implements AfterViewInit {
  @Input() pratica: any;

  items: any = [];
  itemExpandHeight: number = 100;

  constructor(private ref: ChangeDetectorRef) {
    this.items = [
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false}
    ];
  }

  // Wait until the view inits before disconnecting
  ngAfterViewInit() {
    // Since we know the list is not going to change
    // let's request that this component not undergo change detection at all
    this.ref.detach();
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