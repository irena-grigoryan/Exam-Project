import { Component, OnInit } from '@angular/core';
import { User } from '../user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users: User[] = [];
  constructor(
    private _userService: UserService
  ) { }

  // ngOnInit(): void {
  //   this._userService.getUsers().then(users => {
  //     console.log(users);
  //     this.users = users.slice(0, 5);
  //     // this._userService.getUsers().then(d => {
  //     //   this._userService.getUsers().then(e => {
  //     //   });
  //     // });
  //   }).catch(err => {
  //     console.log("!!", err);
  //   });
  //   console.log("^^^^^^^^^^")
  // }

  async ngOnInit() {
    const users = await this._userService.getUsers();
  
    this.users = users.slice(0, 5);
     
    console.log("^^^^^^^^^^")
  }

}
