import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';








@Injectable()
export class UserService {

  constructor(private _http:Http ) { 
  }


 createAccount(user){
    return this._http.post('users/register', user).pipe(map((resp) => resp.json()));
   
 }
 auth(user){
    return this._http.get('user/login', user)
    .pipe(map((resp) => resp.json() ));
 }

 saveUserDate(token, user) {
    localStorage.setItem('AuthToken', token);
    localStorage.setItem('mean_user', user);

 }

  

}
