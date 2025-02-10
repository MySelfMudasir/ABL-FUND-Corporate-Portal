import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../service/state.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header-2',
  standalone: true,
  imports: [
  ],
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.css'
})
export class Header2Component {
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
    this.accountTitle = this.accountTitle.length > 35 ? this.accountTitle.substring(0, 35) + '...' : this.accountTitle;

  }


  logout() {
    const currentRoute = this.router.url;
    this.authService.logout(currentRoute);
  }

}
