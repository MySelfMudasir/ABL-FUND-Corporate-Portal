import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ElementRef, HostListener, Input } from '@angular/core';


@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [
  CommonModule
  ],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent {

  @Input() text: string = '';  // Tooltip text
  showTooltip: boolean = false;

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip = true;
  }
  handleClick() {
    alert('Button clicked!');
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.showTooltip = false;
  }

}
