/**
 * Based on ionic2-rating for Ionic 2: https://github.com/andrucz/ionic2-rating
 */

import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const RATING_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FuelRating),
  multi: true
};

export const STAR_RANKINGS_VALUE: any = {
  normal: '',
  bronze: 'Bronze',
  silver: 'Silber',
  gold: 'Gold'
};

@Component({
  selector: 'fuel-rating',
  styles: [`
    ul.rating {
      padding: 0px;
      margin: 0;
      margin-bottom: 15px;
      display: inline-block;
    }
    ul.rating li {
      display: inline-block;
      border: 0px;
      background: none;
      padding: 3px 5px;
    }
    ul.rating li:first-child {
      padding-left: 0px;
    }
    ul.rating li:last-child {
      padding-right: 8px;
    }
    ul.rating li i {
      display: inline-block;
      width: 34px;
      height: 34px;
    }
    ul.rating li i.icon-fuel {
      background: url(./assets/imgs/fuel-green.png) no-repeat;
      background-size: contain;      
    }
    ul.rating li i.grey {
      background: url(./assets/imgs/fuel-grey.png) no-repeat;
      background-size: contain;      
    }
    .persentText {
      font-size: 30px;
      font-weight: 700;
      color: #2d2d2d;
      display: inline-block;
      margin: 3px 0;
      vertical-align: top;
    }
  `],
  template: `
    <div class="input-item-label">{{label}} <span class="required">*</span></div>
    <ul class="rating" (keydown)="onKeyDown($event)">
      <li *ngFor="let starIndex of starIndexes" tappable (click)="rate(starIndex + 1)">
        <i class="icon-fuel" [class.grey]="getStarStatus(starIndex)"></i>
      </li>
    </ul>
    <span class="persentText">{{getPersent()}}%</span>
    `,
  providers: [RATING_CONTROL_VALUE_ACCESSOR]
})
export class FuelRating implements ControlValueAccessor {

  _max: number = 5;
  _readOnly: boolean = false;
  _nullable: boolean = false;
  _labelText: string = '';
  _persent: number = 0;

  @Input()
  get max() {
    return this._max;
  }
  set max(val: any) {
    const newValue = this.getNumberPropertyValue(val);
    if (newValue !== this._max) {
      this._max = newValue;
      this.createStarIndexes();
    }
  }

  @Input()
  get readOnly() {
    return this._readOnly;
  }
  set readOnly(val: any) {
    this._readOnly = this.isTrueProperty(val);
  }

  @Input()
  get nullable() {
    return this._nullable;
  }
  set nullable(val: any) {
    this._nullable = this.isTrueProperty(val);
  }

  @Input()
  get label() {
    return this._labelText;
  }
  set label(val: any) {
    this._labelText = val;
  }

  innerValue: any;
  starIndexes: Array<number>;

  onChangeCallback: (_: any) => void = noop;

  ngOnInit() {
    // ngFor needs an array
    this.createStarIndexes();
  }

  createStarIndexes() {
    this.starIndexes = Array(this.max).fill(1).map((x, i) => i);
  }

  getStarStatus(starIndex: number) {
    if (this.value === undefined || this.value <= starIndex) {
      return true;
    }
  }

  get value(): any {
    return this.innerValue;
  }

  set value(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.onChangeCallback(value);
    }
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
  }

  getPersent() {
    return this.value * 10;
  }

  onKeyDown(event: any) {
    if (/(37|38|39|40)/.test(event.which)) {
      event.preventDefault();
      event.stopPropagation();

      let newValue = this.value + ((event.which == 38 || event.which == 39) ? 1 : -1);
      return this.rate(newValue);
    }
  }

  rate(value: number) {
    if (this.readOnly || value < 0 || value > this.max) {
      return;
    }

    if (value === this.value && this.nullable) {
      value = null;
    }

    this.value = value;
  }

  private isTrueProperty(val: any): boolean {
    if (typeof val === 'string') {
      val = val.toLowerCase().trim();
      return (val === 'true' || val === 'on');
    }
    return !!val;
  }

  private getNumberPropertyValue(val: any): number {
    if (typeof val === 'string') {
      return parseInt(val.trim());
    }
    return val;
  }

}
