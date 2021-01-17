import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  squareState: string;
  darkTheme = false;

  constructor(private oc: OverlayContainer){

  }
  swithTheme(dark){
    this.darkTheme=dark;
    this.oc.getContainerElement().classList.add(dark ? 'myapp-dark-theme' : null);
  }


}
