import { Component,
  Optional,
  Inject,
  Input,
  ViewChild
} from '@angular/core';

import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';

import {ElementBase} from '../form';


@Component({
  selector: 'date-input',
  template: `
    <div class="input-item-label">{{label}} <span *ngIf="required" class="required">*</span></div>
    <div class="date-wrapper">
      <span class="date-icon" [ngClass]="{'disabled': disabled || readonly}"><i class="fas fa-calendar-alt"></i></span>
      <ion-datetime [displayFormat]="format" 
                    [pickerFormat]="pickerFormat" 
                    [(ngModel)]="value" 
                    [ngClass]="{'invalid': (invalid | async)}"
                    disabled="{{disabled || readonly}}"
                    min="1918" max="2021-12-31"
                    dayNames="der Montag, der Dienstag, der Mittwoch, der Donnerstag, der Freitag, der Samstag, der Sonntag" cancelText="Abbrechen" doneText="Übernehmen" monthNames="Januar, Februar, März, April, Mai, Juni, Juli, August, September, Oktober, November, Dezember">
      </ion-datetime>
    </div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DateInputComponent,
    multi: true
  }]
})
export class DateInputComponent extends ElementBase<string> {

  @ViewChild(NgModel) model: NgModel;

  @Input() label: string;
  @Input() format = 'DD.MM.YYYY';
  @Input() pickerFormat = 'DD MMMM YYYY';
  @Input() disabled: boolean = false;
  @Input() readonly?: boolean = false;
  @Input() required?: boolean = false;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
  ) {
    super(validators, asyncValidators);
  }

}
