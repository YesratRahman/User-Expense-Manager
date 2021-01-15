import { Component } from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "menu",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/menu.svg")
    );
  }
  get isLoggedIn() {
    return  localStorage.getItem("jwt") !== undefined && localStorage.getItem("jwt") !== null;
  }

  logout() {
    localStorage.removeItem("jwt");
  }

}
