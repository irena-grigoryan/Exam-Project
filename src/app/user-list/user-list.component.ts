import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { User } from '../user.interface';
import { faArchive, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';
import { LoggerService } from '../services/logger.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  faArchive = faArchive;
  faUserPlus = faUserPlus;
  users: User[] = [];
  selectedUser: User | undefined | null;
  showUserForm: boolean = false;
  userToAdd: User = {
    id: 0,
    firstName: '',
    lastName: '',
    salary: 0,
    positionName: ''
  };

  constructor(
    private _userService: UserService,
    private _logger: LoggerService,
    private _router: Router
  ) { }

  // ngOnInit(): void {
  //   console.log("init")
  //   this._userService.getUsers().then(users => {
  //     this.users = users;
  //   });
  // }

  // async ngOnInit() {
  //   console.log("init")
  //   this.users = await this._userService.getUsers();
  //   console.log("#############", this.users)
  // }

  ngOnInit() {
    this._userService.getUsersAsOvservable().subscribe(result => {
      this.users = result;
    })
  }

  selectUser(id: number) {
    this._logger.log('userSelect is called');
    //this.selectedUser = this.users.find(e => e.id == id);
    //const selectedUser = this.users.find(e => e.id == id);
    //this.selectedUser = Object.assign({}, selectedUser);

    //redirect on new page
    this._router.navigate(['users', id]);
  }

  save(user: User | undefined | null) {
    if (user) {
      //1st way
      const id = user.id;
      const indx = this.users.findIndex(e => e.id === id);
      if (indx > -1) {
        this.users[indx] = user;
      }

      //2nd way
      /*let selectedUser = this.users.find(e => e.id == id);
      if (selectedUser) {
        selectedUser.name = this.selectedUser.name;
      }*/
    }
  }

  deleteUser(id: number) {
    this._logger.log('deleteUser is called');
    const indx = this.users.findIndex(e => e.id == id);
    if (indx > -1) {
      this.users.splice(indx, 1);
      this.selectedUser = null;
    }
  }

  showAddUserForm() {
    /*this.selectedUser = null;
    this.showUserForm = true;*/

    //redirect to new page
    this._router.navigate(['users/add']);
  }

  addUser() {
    this._logger.log('addUser is called');
    let maxId = 0;
    for (let i = 0, l = this.users.length; i < l; i++) {
      if (this.users[i].id > maxId) {
        maxId = this.users[i].id;
      }
    }
    this.userToAdd.id = ++maxId;
    this.users.push(this.userToAdd);
    this.showUserForm = false;
    //this is to clear form when add user again
    this.userToAdd = {
        id: 0,
        firstName: '',
        lastName: '',
        salary: 0,
        positionName: ''};
  }
}
