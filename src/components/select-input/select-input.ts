import {
  Component,
  Optional,
  Inject,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

import {ElementBase} from '../form';


@Component({
  selector: 'select-input',
  template: `
    <div class="input-item-label" *ngIf="label">{{label}}</div>
    <ion-item>
      <ion-select [interface]="interface"
                  (ionChange)="selectValue(value)" 
                  [(ngModel)]="value" 
                  [ngClass]="{invalid: (invalid | async)}"
                  placeholder="{{placeholder}}"
                  disabled="{{disabled || options.length == 0}}">
        <ion-option [value]="option.value" *ngFor="let option of options">{{option.text}}</ion-option>
      </ion-select>
    </ion-item>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SelectInputComponent,
    multi: true
  }]
})
export class SelectInputComponent extends ElementBase<string> {

  @Input() public label: string;  
  @Input() public interface?: string;
  @Input() public options = [];
  @Input() public placeholder: string;
  @Input() public disabled: boolean = false;

  @Output() change: EventEmitter<any> = new EventEmitter();

  @ViewChild(NgModel) model: NgModel;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
  ) {
    super(validators, asyncValidators);
  }

  selectValue(value) {
    // do emit an ionChange event
    this.change.emit();    
  }
}
