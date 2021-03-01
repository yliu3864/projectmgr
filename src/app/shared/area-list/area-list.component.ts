import { Component, OnInit,forwardRef,OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, FormGroup} from '@angular/forms'
import { Address } from 'src/app/domain';
import { Subject, Observable, Subscription } from 'rxjs';
import {getProvinces,getCitiesByProvince} from '../../utils/area.util'
import { map, startWith } from 'rxjs/operators';
import { fi } from 'date-fns/esm/locale';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaListComponent implements OnInit,OnDestroy,ControlValueAccessor{

  _address: Address = {
    province: '',
    city: '',
    street: '',
  };
  _province = new Subject<string>();
  _city = new Subject<string>();
  _street = new Subject();
  provinces$: Observable<string[]>;
  cities$: Observable<string[]>;
  sub: Subscription;
  private propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
    const province$ = this._province.asObservable().startWith('');
    const city$ = this._city.asObservable().startWith('');
    const street$ = this._street.asObservable().startWith('');
    const val$ = Observable.combineLatest([province$, city$, street$],(_p,_c,_s)=>{
      return{
        province: _p,
        city: _c,
        street: _s,
      }
    })
    this.sub = val$.subscribe( v => {
      this.propagateChange(v);
    });
    this.provinces$ = Observable.of(getProvinces());
    this.cities$ = province$.pipe(
      map(province => getCitiesByProvince(province))
    );
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

  writeValue(obj: Address): void{
    if(obj){
      this._address = obj;
      if(this._address.province){
        this._province.next(this._address.province);
      }
      if(this._address.city){
        this._city.next(this._address.city);
      }
      if(this._address.street){
        this._street.next(this._address.street);
      }
    }
  }

  registerOnChange(fn:any):void{
    this.propagateChange = fn;
  }

  registerOnTouched(fn:any):void{ }

  validate(c: FormControl):{[key: string]:any}{
    const val = c.value;
    if(!val) {
      return null;
    }
    if(val.province && val.city && val.street){
      return null;
    }
    return {
      addressInvalid: true
    }
  }

  onProvinceChange(){
    this._province.next(this._address.province);
  }

  onCityChange(){
    this._province.next(this._address.city);
  }

  onAddressChange(){
    this._province.next(this._address.street);
  }
}
