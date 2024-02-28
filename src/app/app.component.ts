import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { AssignmentsComponent } from './assignments/assignments.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatDividerModule,
            MatIconModule,
            AssignmentsComponent, RouterLink, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Assignements app';

  constructor(private authService: AuthService,
              private router: Router){}

  login(){
    if(!this.authService.loggedIn){
      this.authService.logIn();
    } else {
      this.authService.logOut();
      this.router.navigate(['home']);
    }
  }

}
