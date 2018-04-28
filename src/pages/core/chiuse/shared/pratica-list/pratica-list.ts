import { Component, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pratica-list',
  inputs: ['items'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'pratica-list.component.html'
})
export class PraticaList implements AfterViewInit {

  @Output() onClickItem: EventEmitter<any> = new EventEmitter();
  items_array: any;
  set items(value) {
    console.log("aaaaa  set items(value)");
    if (value) {
      this.items_array = value;
      if (this.items_array.length > 0) {
        this.ref.reattach();
        setTimeout(() => {
          console.log("ggggg");
          this.ref.detach();
        }, 1000);
      }
    }
  }
  constructor(private ref: ChangeDetectorRef) {
    console.log("aaaaa  constructor");
    //this.items = [];
    //ref.detach();
  }

  // Wait until the view inits before disconnecting
  ionViewDidLoad() {
    console.log("aaaaa  ionViewDidLoad");
  }
  ngAfterViewInit() {
    console.log("aaaaa  ngAfterViewInit");
      // Since we know the list is not going to change
    // let's request that this component not undergo change detection at all
    //this.ref.detach();
  }

  // set item(value) {
  //   console.log('Pratica value:', value);
  //   if (value) {
  //     this.ref.reattach();
  //   } else {
  //     this.ref.detach();
  //   }
  // }

  /**
   * Handle clicked on item
   */
  selectPraticeItem(item): void {
    this.onClickItem.emit(item);
  }

  tractByID(index, item) {
    console.log("zzzzz");
    return item.ID;
  }
}
     