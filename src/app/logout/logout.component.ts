import { Component } from '@angular/core';
import { MainModule } from '../main/main.module';
import { ModalContentComponent } from '../main/modal-content/modal-content.component';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    MainModule,
    ModalContentComponent

  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {


  ngOnInit(): void {
    this.openModal();
  }

  openModal(): void {
    const modalButton = document.querySelector('button[data-bs-target="#modalCenter"]') as HTMLElement;
    if (modalButton) {
      modalButton.click();
    }
  }




}
