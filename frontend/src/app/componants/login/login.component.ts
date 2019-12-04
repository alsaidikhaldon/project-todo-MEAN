import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  email: string;
  password: string;
  msg : any;

  constructor(private _userService:UserService,private _route:Router) {

   
   }
   

  ngOnInit() {
  }

 

  onlogin(){
   
      if(!this.email || !this.password){
        this.msg ="All fields are required ... ";
        return false;
      }

      const user = {
        email:this.email,
        password:this.password
      }

      this._userService.auth(user).subscribe(
        resp => {
        if(!resp.success){
         this.msg=resp.message;
       }
      this._userService.saveUserDate(resp.token, resp.user);
      console.log(resp);
      
      });

    

  }



}
