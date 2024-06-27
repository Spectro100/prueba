import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import User from 'src/app/models/userform.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {
  userList: User[] = [];
  columns: string[] = ['firstName', 'lastName', 'email', 'password', 'actions'];
  dataSource = new MatTableDataSource(this.userList);

  constructor(private userService: UserService) {}

  ngOnInit()
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
      error: (e) => console.error(e)
    });
  }
}
