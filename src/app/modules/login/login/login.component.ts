import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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

  hide: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    Swal.fire({
      text: "Please wait",
      didOpen: () => Swal.showLoading(),
      scrollbarPadding: false,
      heightAuto: false
    });

    this.authService.login(this.loginForm.value)
      .then(res => {
        Swal.close();
        this.router.navigate(['']);
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
