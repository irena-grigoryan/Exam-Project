import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user.interface';
import { LoggerService } from '../services/logger.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User | undefined | null;
  @Output() saveEvent = new EventEmitter<User | undefined | null>();

  constructor(
    private _logger: LoggerService,
    private _activeRoute: ActivatedRoute,
    private _userService: UserService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this._activeRoute.params.subscribe(param => {
      if (param && param.id) {
        this.user = this._userService.getUser(param.id);
      }
    });
    //route snapshot example
    console.log(this._activeRoute.snapshot.params);
  }

  save() {
    this._logger.log('userSave is called');
    this.saveEvent.emit(this.user);
    //call service to save user then redirect where came back
    this._userService.updateUser(this.user as User);
    this.goBack();
  }

  goBack() {
    this._location.back();
  }

}
