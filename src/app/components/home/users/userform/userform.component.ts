import { Component } from '@angular/core';
import User from 'src/app/models/userform.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService) {}

  async submit()
  {
    console.log(this.user);
    try {
      await this.userService.addUser(this.user);
    }
    catch (error) {
      console.error(error);
    }
  }
}
