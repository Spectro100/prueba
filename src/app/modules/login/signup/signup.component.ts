import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', Validators.required)
  }, {validators: this.validateAreEqual});

  hidePass: boolean = true;
  hideCPass: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  signUp()
  {
    Swal.fire({
      text: "Please wait",
      didOpen: () => Swal.showLoading(),
      scrollbarPadding: false,
      heightAuto: false
    });

    this.authService.signUp(this.signupForm.value)
      .then(() => {
        Swal.close();
        this.router.navigate(['']);
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Error processing the request.",
          icon: "error",
          scrollbarPadding: false,
          heightAuto: false
        });
      })
  }

  public validateAreEqual(c: AbstractControl): { notSame: boolean } | null {
    if (c.get('password')?.value === c.get('confirmPassword')?.value)
      return null;
    else
      return {notSame: true};
  }
}
