import { Component } from '@angular/core';
import {User} from 'src/app/models/userform.model';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent {
  user: User = {
    id: '',
    firstName: '', 
    lastName: '', 
    cellphone: '', 
    email: '',
    password: '',
    department: ''
  };

  hide: boolean = true;

  toaster = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  constructor(private userService: UserService, private router: Router) {
    if (this.router.getCurrentNavigation()?.extras !== undefined)
      if (this.router.getCurrentNavigation()?.extras?.state !== undefined)
        this.user = this.router.getCurrentNavigation()?.extras?.state?.['userInfo'];

    console.log(this.user);
  }

  async addUser()
  {
    try {
      await this.userService.addUser(this.user).then(() => {
        this.toaster.fire({
          icon: "success",
          title: "User added succesfully"
        });
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
      this.userService.editUser(this.user).then((res) => {
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
