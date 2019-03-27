import { Component } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-slider-height',
  templateUrl: './slider-height.component.html',
  styleUrls: ['./slider-height.component.css']
})
export class SliderHeightComponent {

  heightValue = 30;
  weightValue = 0;
  height$: Observable<number>;
  bmi$: Observable<number>;
  height: FormControl;
  weight: FormControl;
  bmi: number;
  weight$: Observable<number>;
  currentClasses: {};
  currentMessage: string;
  percentageValue: (value: number) => string;

  constructor() {
    // this.percentageValue = (value: number): string => {
    //   return `${Math.round(value)} 
    //    ${this.currentMessage? this.currentMessage : "" }`;
    // };
    this.percentageValue = (value: number): string => {
      return `${Math.round(value)} 
       BMI`;
    };
    this.height = new FormControl('');
    this.weight = new FormControl('');
    this.height$ = this.height.valueChanges;
    this.height$.subscribe(a => this.heightValue = a);
    this.weight$ = this.weight.valueChanges;
    this.weight$.subscribe(a => this.weightValue = a);
    this.bmi$ = combineLatest(this.height$, this.weight$).pipe(
      map(([height, weight]) => {
        this.bmi = height > 0 ? weight * 10000 / (height * height) : 0;
        this.heightValue = height;
        this.setCurrentClasses();
        this.setCurrentMessage();
        // this.percentageValue = function(value: number): string {
        //   return `${Math.round(value)} BMI`;
        // };
        return this.bmi;
      }));

  }

  onKeyHeight(event: any) {
    this.height.setValue(event.target.value);
  }

  onKeyWeight(event: any) {
    this.weight.setValue(event.target.value);
  }

  setCurrentClasses() {
    this.currentClasses = {
      alert: true,
      'row justify-content-md-center': true,
      'col-8': true,
      'alert-danger': _.inRange(!this.bmi && this.bmi < 1 ? 1 : this.bmi, 16) || _.inRange(this.bmi, 35, 7000000),
      'alert-warning': _.inRange(this.bmi, 16, 18.5) || _.inRange(this.bmi, 25, 35),
      'alert-success': _.inRange(this.bmi, 18.5, 25)
    }
  }

  setCurrentMessage()  {
    if (this.bmi >= 0 && this.bmi < 16) {
      this.currentMessage = 'Infrapeso: Delgadez Severa';
    } else if (this.bmi < 17) {
      this.currentMessage = 'Infrapeso: Delgadez moderada';
    } else if (this.bmi < 18.5) {
      this.currentMessage = 'Infrapeso: Delgadez aceptable';
    } else if (this.bmi < 25) {
      this.currentMessage = 'Peso Normal';
    } else if (this.bmi < 30) {
      this.currentMessage = 'Sobrepeso';
    } else if (this.bmi < 35) {
      this.currentMessage = 'Obeso: Tipo I';
    } else if (this.bmi < 40) {
      this.currentMessage = 'Obeso: Tipo II';
    } else if (this.bmi >= 40) {
      this.currentMessage = 'Obeso: Tipo III';
    }
  }

  formatLabelHeight(value: number | null) {
    if (!value) {
      return 30;
    }
    return value + 'cm';
  }

  formatLabelWeight(value: number | null) {
    if (!value) {
      return 0;
    }
    return value + 'kg';
  }

}
