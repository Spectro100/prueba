import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  signUp: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.login(this.loginForm.value)
      .then(res => {
        this.router.navigate(['']);
        console.log(res);
      })
      .catch(error => {
        if (error.code == 'auth/invalid-credential')
          Swal.fire({
            title: "Error!",
            text: "Invalid Credentials.",
            icon: "error",
            scrollbarPadding: false,
            heightAuto: false
          });
        else
        Swal.fire({
          title: "Error!",
          text: "Error processing the request.",
          icon: "error",
          scrollbarPadding: false,
          heightAuto: false
        });
      });
  }
}
