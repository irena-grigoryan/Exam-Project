import { Injectable } from '@angular/core';
import { USERS } from '../mock-users';
import { LoggerService } from './logger.service';
import { User } from '../user.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _logger: LoggerService) { }

  getUsers(): Promise<User[]> {
    this._logger.log('getUsers() is called');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(USERS);
      }, 3000)
    });
  }

  getUsersAsOvservable(): Observable<User[]> {
    const users = of(USERS);
    return users;
  }

  getUser(id: number) {
    const user = USERS.find(e => e.id == id);
    return user;
  }

  updateUser(user: User) {
    const selectedIndex = USERS.findIndex(e => e.id == user.id);
    if (selectedIndex > -1) {
      USERS[selectedIndex] = user;
    }
  }

  addUser(user: User) {
    let maxId = 0;
    for (let i = 0, l = USERS.length; i < l; i++) {
      if (USERS[i].id > maxId) {
        maxId = USERS[i].id;
      }
    }
    user.id = ++maxId;
    USERS.push(user);
  }
}
