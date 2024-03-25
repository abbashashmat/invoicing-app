import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  login(): void {
    // Check if username and passowrd is not empty
    if ((this.email || "") == "" && (this.password || "") == "") {
      return
    }

    if ((this.email || "") != "" && (this.password || "") != "") {
      this.authService.getUsers().subscribe(users => {
        const user = users.find((u: any) => u.email === this.email && u.password === this.password);
        if (user) {
          alert('Login successful');
          localStorage.setItem('userId', user.id)
          this.router.navigate(['/']);
        } else {
          alert('Invalid username or password');
        }
      });
    }
  }

}
