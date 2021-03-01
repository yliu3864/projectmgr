import { Component, OnInit,forwardRef,OnDestroy, Input,ChangeDetectionStrategy } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, FormGroup} from '@angular/forms'
import { identityType, Identity } from 'src/app/domain';
import { Subject, Observable, Subscription } from 'rxjs'

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityInputComponent implements OnInit,OnDestroy,ControlValueAccessor{

  identityTypes = [
    {
    value: identityType.IdCard,label: 'SIN'
    },
    {
    value: identityType.DriverLicense,label: 'DriverLicense'
    },
];
identity: Identity = {identityType: null, identityNo: null};

  private _idType = new Subject<identityType>();
  private _idNo = new Subject<string>();
  private propagateChange = (_: any) => {};
  private sub: Subscription;

  constructor() { }

  ngOnInit() {
    const val$ = Observable.combineLatest(this.idNo, this.idType, (_no,_type) =>{
      return {
        identityType : _type,
        identityNo: _no,
      }
    });
    this.sub = val$.subscribe(id => {
      this.propagateChange(id);
    })
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

  onIdTypeChange(idType: identityType){
    this._idType.next(idType);
  }

  onIdNoChange(idNo: string){
    this._idNo.next(idNo)
  }

  get idType(): Observable<identityType>{
    return this._idType.asObservable();
  }

  get idNo(): Observable<string>{
    return this._idNo.asObservable();
  }

  writeValue(obj: any): void{
    if(obj){
      this.identity = obj;
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
    switch (val.identiyType) {
      case identityType.IdCard:{
        return this.validateIdCard(c);
      }
      case identityType.DriverLicense:{
        return this.validateDriverLicense(c);
      }
      default: 
        break;
    }
  }

  validateIdCard(c: FormControl):{[key: string]:any}{
    const val = c.value.identityNo;
    if(val.length !==9) {
      return {idInvalid: true};
    }
    return {idNotInvalid: true }
  }

  validateDriverLicense(c: FormControl):{[key: string]:any}{
    const val = c.value.identityNo;
    if(val.length !==9) {
      return {idInvalid: true};
    }
    return {idNotInvalid: true }
  }
}
