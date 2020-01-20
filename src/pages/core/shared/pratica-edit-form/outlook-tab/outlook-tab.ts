import { Component, Input } from '@angular/core';
import * as CONSTANTS from '../../../../../shared/constants';

@Component({
  selector: 'outlook-tab',
  templateUrl: 'outlook-tab.html'
})
export class OutlookTabComponet {
  @Input() pratica: any;

  items: any = [];
  //itemExpandHeight: number = 500;
  itemExpandHeight: any = "auto";

  responsibility: string = ""; 	// Display Presunta	Responsabilità

  constructor() {
    this.items = [
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false},
      {expanded: false}
    ];

  }

  expandItem(item, checkAssicurativa){
      if(checkAssicurativa && !this.pratica.Tipo.Assicurativa)
      {
        return false;
      }

      this.items.map((listItem) => {

        if(item == listItem){
            listItem.expanded = !listItem.expanded;
        } else {
            listItem.expanded = false;
        }

        return listItem;

      });
    

  }

  calcolaResponsability(SinistroP1CircostanzaID, SinistroP2CircostanzaID){
    
    let valueReponsability: string = "";

    if(SinistroP1CircostanzaID != null && SinistroP1CircostanzaID != null)
    {
      valueReponsability =  CONSTANTS.PRESENT_RESPONSIBILITY[CONSTANTS.BAREME[SinistroP1CircostanzaID - 1][SinistroP2CircostanzaID - 1]];
    }

    return valueReponsability;
    
  }

  ngOnInit() {
    console.log('OutlookTabComponet. ngOnInit');


    for(var item in this.items)
    {
      this.items.map((item) => {
        item.expanded = false;
      });
    }

    this.responsibility = this.calcolaResponsability(this.pratica.SinistroP1CircostanzaID, this.pratica.SinistroP2CircostanzaID);

  }

}