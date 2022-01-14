import { Component } from '@angular/core';
import { LoggerService } from './services/logger.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  activeRoute: string = '';
  date: Date = new Date();
  d: number = 2;

  constructor(
    private _logger: LoggerService,
    private _router: Router
  ) {
    this._router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.activeRoute = val.url.substr(1);
      }
    })
  }

  getLogs() {
    return this._logger.logs;
  }

  navigate(url: string) {
    this.activeRoute = url;
    this._router.navigate([url]);
  }

  pow(val: number, p: number) {
    console.log("2222")
    return Math.pow(val, p);
  }

  test() {
    this.date = new Date();
    this.date.setDate(this.date.getDate() - 1);
    this.d = 4;
  }
}
