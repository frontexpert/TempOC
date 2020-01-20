import {Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const SWITCHER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SwitcherComponent),
  multi: true
};

@Component({
  selector: 'switcher',
  templateUrl: 'switcher.html',
  providers: [SWITCHER_CONTROL_VALUE_ACCESSOR]
})
export class SwitcherComponent implements ControlValueAccessor {  

  @Input() values = [];  
  @Input() label: string;
  @Input() withCheckMark: boolean;
  @Input() checkedTabs: string[] = [];
  @Input() disabled: boolean = false;

  innerValue : any;
  
  constructor() {}  

  selectValue(value) { 
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.onChangeCallback(value);
    }
  }

  //get accessor
  get value(): any {
    return parseInt(this.innerValue);
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;  
  //From ControlValueAccessor interface
  registerOnChange(fn: any) { this.onChangeCallback = fn; }
  //From ControlValueAccessor interface
  registerOnTouched(fn: any) { this.onTouchedCallback = fn; }

}
