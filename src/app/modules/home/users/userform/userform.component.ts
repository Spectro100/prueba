import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent {
  user: FormGroup = new FormGroup({});

  formInit()
  {
    this.user = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      address: new FormControl('', Validators.required),
      cellphone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      department: new FormControl('', Validators.required)
    });
  }

  hide: boolean = true;

  constructor(private userService: UserService, private router: Router) {
    this.formInit();

    if (this.router.getCurrentNavigation()?.extras !== undefined)
      if (this.router.getCurrentNavigation()?.extras?.state !== undefined)
        this.user.setValue(this.router.getCurrentNavigation()?.extras?.state?.['userInfo']);
  }

  async addUser(formDirective: FormGroupDirective)
  {
    Swal.fire({
      text: "Please wait",
      didOpen: () => Swal.showLoading(),
      scrollbarPadding: false,
      heightAuto: false
    });

    await this.userService.addUser(this.user.value)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "User succesfully added.",
          icon: "success",
          scrollbarPadding: false,
          heightAuto: false
        });

        this.formInit();
        formDirective.resetForm();
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "User could not be added.",
          icon: "error",
          scrollbarPadding: false,
          heightAuto: false
        });
        console.error(error);
      });
  }

  async editUser()
  {
    Swal.fire({
      text: "Please wait",
      didOpen: () => Swal.showLoading(),
      timer: 10000,
      scrollbarPadding: false,
      heightAuto: false
    });

    await this.userService.editUser(this.user.value)
    .then(() => {
      Swal.fire({
        title: "Success!",
        text: "User succesfully updated.",
        icon: "success",
        scrollbarPadding: false,
        heightAuto: false
      });
    })
    .catch((error) => {
      Swal.fire({
        title: "Error!",
        text: "User could not be updated.",
        icon: "error",
        scrollbarPadding: false,
        heightAuto: false
      });
      console.error(error);
    });

  }
}
