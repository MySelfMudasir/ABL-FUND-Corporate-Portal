import { Component, AfterViewInit } from '@angular/core';

declare var $: any; // Declare jQuery

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
  ],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements AfterViewInit {

  ngAfterViewInit() {

    // Initialize Bootstrap Datepicker for different IDs
    $('#bs-datepicker-basic').datepicker({
      autoclose: true,
      format: 'mm/dd/yyyy',
      todayHighlight: true, // Highlights the current date
    });

    $('#bs-datepicker-format').datepicker({
      autoclose: true,
      format: 'dd/mm/yyyy',
      todayHighlight: true,
    });

    // Date Range Picker initialization
    $('#bs-datepicker-daterange').datepicker({
      autoclose: true,
      format: 'mm/dd/yyyy',
      todayHighlight: true
    });


    $('#bs-datepicker-disabled-days').datepicker({
      autoclose: true,
      format: 'mm/dd/yyyy',
      daysOfWeekDisabled: [0, 6] // Example: Disable weekends
    });

    $('#bs-datepicker-multidate').datepicker({
      autoclose: true,
      format: 'mm/dd/yyyy',
      multidate: true
    });

    $('#bs-datepicker-options').datepicker({
      autoclose: true,
      format: 'mm/dd/yyyy'
    });

    $('#bs-datepicker-autoclose').datepicker({
      autoclose: true,
      format: 'mm/dd/yyyy'
    });

    $('#bs-datepicker-inline').datepicker({
      format: 'mm/dd/yyyy',
      inline: true
    });
  }
}
