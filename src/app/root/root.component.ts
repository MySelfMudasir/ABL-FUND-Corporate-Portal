import { Component } from '@angular/core';
import { MainModule } from '../main/main.module';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MainModule,
    LoginComponent,
    HomeComponent
],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})
export class RootComponent {


}
