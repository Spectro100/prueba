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

  toaster = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  constructor(private userService: UserService, private router: Router) {
    this.formInit();

    if (this.router.getCurrentNavigation()?.extras !== undefined)
      if (this.router.getCurrentNavigation()?.extras?.state !== undefined)
        this.user.setValue(this.router.getCurrentNavigation()?.extras?.state?.['userInfo']);
  }

  async addUser(formDirective: FormGroupDirective)
  {
    try {
      await this.userService.addUser(this.user.value).then(() => {
        this.toaster.fire({
          icon: "success",
          title: "User added succesfully"
        });
        this.formInit();
        formDirective.resetForm();
      });
    }
    catch (error) {
      this.toaster.fire({
        icon: "error",
        title: "User could not be added"
      });
      console.error(error);
    }
  }

  async editUser()
  {
    try {
      this.userService.editUser(this.user.value).then((res) => {
        this.toaster.fire({
          icon: "success",
          title: "User info updated succesfully"
        });

        console.log(res);
      });
    }
    catch (error) {
      this.toaster.fire({
        icon: "error",
        title: "User info could not be updated"
      });
      console.error(error);
    }
  }

  clickEvent() {
    this.hide = !this.hide;
  }
}
