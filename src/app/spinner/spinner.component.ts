import { Component, OnInit, OnDestroy, } from '@angular/core';
import { StateService } from '../service/state.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [
      NgIf
    ],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  timeRemaining: number = 120; // Set initial time to 120 seconds (2 minutes)
  interval: any;
  activeResendBtn: boolean = true;
  animationActive: boolean = true; // Flag to control animation state

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval); // Clean up interval when component is destroyed
    }
  }

  startCountdown() {
    this.interval = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        clearInterval(this.interval); // Stop the countdown when it reaches 0
        this.isActiveResendBtn();
      }
    }, 1000); // Update every 1 second
  }

  isActiveResendBtn() {
    this.activeResendBtn = !this.activeResendBtn;
  }


  onResendOtpTriggered() {
    this.isActiveResendBtn();
    this.stateService.triggerResendOtp();
  
    if (this.activeResendBtn) {
      // Reset the countdown
      this.timeRemaining = 120;
      // Restart the spinner animation
      this.restartSpinnerAnimation();
      this.startCountdown(); // Restart the timer logic
    }
  }
  

  restartSpinnerAnimation() {
    this.animationActive = false; // Temporarily disable the animation
    setTimeout(() => {
      this.animationActive = true; // Re-enable the animation after a short delay
    }, 0); // Delay to allow the DOM to reflow
  }


  get minutes(): string {
    const minutes = Math.floor(this.timeRemaining / 60);
    return minutes < 10 ? `0${minutes}` : `${minutes}`;
  }

  get seconds(): string {
    const seconds = this.timeRemaining % 60;
    return seconds < 10 ? `0${seconds}` : `${seconds}`;
  }


}
