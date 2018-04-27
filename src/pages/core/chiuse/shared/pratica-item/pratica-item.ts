import { Component, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'pratica-item',
  //inputs: ['item'],
  template: `
    <h2>{{item.P1_Targa}} - <span *ngIf="item.P1_Nome && item.P1_Cognome; else elseNome">{{item.P1_Nome}} {{item.P1_Cognome}}</span><ng-template #elseNome>{{item.P1_NomeCompleto}}</ng-template></h2>
    <p><span *ngIf="item.P1_Veicolo; else elseVeicolo">{{item.P1_Veicolo}}</span><ng-template #elseVeicolo>{{item.P1_Marca}} {{item.P1_Modello}}</ng-template></p>
    <div item-end>
      <span [ngClass]="(item.AutoSostitutiva == true) ? 'car-red' : 'car-green'" *ngIf="item.AutoSostitutiva != null">
        <i class="fas fa-car"></i>
      </span>
      <span class="blue" *ngIf="item.Lavorazione">
        <ion-badge *ngIf="item.Lavorazione">{{item.Lavorazione.CodiceTappo != null ? item.Lavorazione.CodiceTappo : '..'}}</ion-badge>
        <div [ngSwitch]="item.Lavorazione.StatoID">
          <i *ngSwitchCase="2" class="far fa-clock" style="color: orange;"></i>
          <b *ngSwitchCase="3" style="color: red;">A</b>
          <i *ngSwitchCase="4" class="fas fa-wrench"></i>
          <b *ngSwitchCase="5" style="color: green;">U</b>
          <ion-icon *ngSwitchCase="6" name="md-checkmark" style="color: white;"></ion-icon>
          <i *ngSwitchDefault>&nbsp;</i>
        </div>
      </span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PraticaItem implements AfterViewInit {

  @Input() item: any;

  constructor(private ref: ChangeDetectorRef) {   
  }

  // Wait until the view inits before disconnecting
  ngAfterViewInit() {
    // Since we know the list is not going to change
    // let's request that this component not undergo change detection at all
    this.ref.detach();
  }

  // set item(value) {
  //   console.log('Pratica value:', value);
  //   if (value) {
  //     this.ref.reattach();
  //   } else {
  //     this.ref.detach();
  //   }
  // }
}