import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private errors = [];
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registerUser(event: any) {
    event.preventDefault();
    this.errors = [];
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    const cpassword = target.querySelector('#cpassword').value;

    if (password !== cpassword) {
      this.errors.push('Passwords do not match');
    }

    // TODO more validation

    if (this.errors.length === 0) {
      this.auth.registerUser(username, password).subscribe(({status, data}) => {
        if (status === 'ok') {
          this.auth.setLoggedIn(true);
          this.router.navigate(['dashboard']);
        } else {
          this.errors.push(data);
        }
      });
    }

    // this.auth.getUserDetails(username, password).subscribe(({ status, data }) => {
    //   if(status === 'ok') {
    //     this.router.navigate(['admin']);
    //     this.auth.setLoggedIn(true);
    //   } else {
    //     window.alert(data);
    //   }
    // });
  }
}
