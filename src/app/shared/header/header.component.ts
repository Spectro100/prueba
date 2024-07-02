import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logOut()
  {
    this.authService.logOut()
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Error processing the request.",
          icon: "error",
          scrollbarPadding: false,
          heightAuto: false
        });
      })

      this.router.navigate(['login']);
  }
}
