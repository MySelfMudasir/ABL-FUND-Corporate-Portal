import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { StateService } from '../service/state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isActiveRoute:string;
  accountTitle:string = '';


  constructor(private authService: AuthService, private router: Router, private stateService: StateService) {
    this.isActiveRoute = this.router.url;
    // console.log(this.isActiveRoute);
    
     // Get initial account title from session storage
     this.accountTitle = this.stateService.getAccountTitle();

     // Subscribe to account title changes
     this.stateService.accountTitle$.subscribe(title => {
       this.accountTitle = title;
     });

  }



  ngOnInit(): void {
    this.accountTitle = sessionStorage.getItem('accountTitle') || '';
  }


  logout() {
    this.authService.logout();
  }

}
