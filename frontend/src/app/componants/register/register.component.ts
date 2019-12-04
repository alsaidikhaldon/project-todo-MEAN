import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstname: string;
  lastname: string;
  email: string;
  password: string;
  msg: any;
  

  constructor(private _userService: UserService,private _router:Router) {
  }
    

   

  ngOnInit() {
  }

  onRegister(){

    if(!this.firstname || !this.lastname || !this.email || !this.password){
      console.log("all  fields is required");
      this.msg = "All fields is rquired .. please tray agine!";
      
    

      return false;
    }

    

    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password

    }

    
 
  

   this._userService.createAccount(user).subscribe(
     resp  => {
       if(!resp.success){
              this.msg = resp.message;
              console.log(resp.message);
              return false;
            }
            console.log(resp.message +"   " + user);
            this.msg = resp.message;
            // return this._router.navigate(['/login']);
             setTimeout(() => {
              this._router.navigate(['/login']);
            }, 3000);
          }
    
    );
  };
}
