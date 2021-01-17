import { NgModule, SkipSelf, Optional } from '@angular/core';
import{HttpClientModule}from "@angular/common/http";
import{MatIconRegistry} from "@angular/material";
import{DomSanitizer} from "@angular/platform-browser";
import{BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {SharedModule}from "../shared/shared.module"
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {loadSvgResources} from "../utils/svg.util";
import { AppRoutingModule } from '../app-routing.module';





@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule,
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parent: CoreModule,
  ir: MatIconRegistry, 
  ds: DomSanitizer){
    if(parent){
      throw new Error('Module already exists!');
    }
    loadSvgResources(ir,ds)
  }
}
