import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './modal-content.component.html',
  styleUrl: './modal-content.component.css'
})


export class ModalContentComponent {
  
  @Input() data: any = {};  // Change the type to `any` or a proper interface to handle objects
  @Input() title: string = '';
  modalBodyData: string = '';
  modalTitle: string = '';
  isActive: boolean = false;
  iconClass: string = 'fa-copy'; // Default icon class

  setModalContent(title: string, body: string) {
    this.modalTitle = title;
    this.modalBodyData = body;
  }


  
  constructor() {}

  
  ngOnInit() {
    // Access the data passed to the modal in ngOnInit
    this.modalBodyData = this.data;
    this.modalTitle = this.title;
  }







  


}
