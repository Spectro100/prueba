import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {User} from 'src/app/models/userform.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {
  userList: User[] = [];
  columns: string[] = ['firstName', 'lastName', 'cellphone', 'email', 
    'department', 'actions'];
  dataSource = new MatTableDataSource(this.userList);

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit()
  {
    this.getUsers();
  }

  getUsers()
  {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.userList = res.map((e: any) => {
          const data: User = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });

        this.dataSource = new MatTableDataSource(this.userList);
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  edit(user: User)
  {
    this.router.navigate(['userform'], { state: { userInfo: user } });
  }

  async deleteUser(user: User)
  {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {

      if (result.isConfirmed)
      {
        this.userService.deleteUser(user)
        .then((res) => {
          Swal.fire({
            title: "Deleted!",
            text: "User deleted.",
            icon: "success"
          });

          console.log(res);
          this.getUsers();
        })
        .catch(error => {
          Swal.fire({
            title: "Error!",
            text: "User could not be deleted.",
            icon: "error"
          });

          console.error(error);
        });
      }
    })
  }
}
