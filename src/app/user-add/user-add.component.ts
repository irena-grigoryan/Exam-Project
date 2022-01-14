import { Component, OnInit } from '@angular/core';
import { User } from '../user.interface';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  userToAdd: User = {
    id: 0,
    firstName: '',
    lastName: '',
    salary: 0,
    positionName: ''
  };

  constructor(
    private _userService: UserService,
    private _location: Location
  ) { }

  ngOnInit(): void {
  }

  add() {
    this._userService.addUser(this.userToAdd as User);
    this.goBack();
  }

  goBack() {
    this._location.back();
  }

}
