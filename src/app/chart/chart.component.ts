import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() chartData: any; // Input for chart data
  @Output() notify: EventEmitter<void> = new EventEmitter();
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;


  private chart: Chart | undefined;
  
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('initializing chart', this.chartData);
    if (this.chartData) this.initChart();
  }

  
  ngOnDestroy(): void {
    if (this.chart) this.chart.destroy();
  }


  
  // Initialize the first chart
  private initChart() {
    const canvas = this.chartCanvas.nativeElement;
    this.chart = new Chart(canvas, {
      type: this.chartData.type,
      data: this.chartData.data,
      options: this.chartOptions,
    });
  }

  

  updateChart() {
    if (this.chart) {
      this.chart.data = this.chartData.data; // Update the chart's data
      this.chart.update(); // Trigger re-rendering
      this.cdr.detectChanges();
    }
  }
  
  




  chartOptions: any = {
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    datalabels: {
      // Add this section for data labels
      anchor: 'end',
      align: 'end',
      color: '#fff', // Change color as needed
      formatter: (value: number) => {
        return value.toFixed(2) + '%'; // Customize how the labels appear
      },
    },
    responsive: false, // Set to false if you want fixed dimensions
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          boxWidth: 15,
          boxHeight: 15,
          useBorderRadius: true,
          borderRadius: 15,
          font: {
            size: 15 // Set the font size for the chart labels
          }
        },
      },
      tooltip: {
        enabled: true, // Disable default tooltip
        mode: 'index',
        position: 'nearest',
        titleColor: '#fff',
        padding: 15,
        borderColor: 'white',
        borderWidth: 1.5,
        usePointStyle: false,
        bodyAlign: 'left',
        cornerRadius: 6,
        boxPadding: 5,
        callbacks: {
          label: (tooltipItem: any) => {
            const dataIndex = tooltipItem.dataIndex;
            const dataValue = tooltipItem.dataset.data[dataIndex];
            const dataValueTotal = tooltipItem.dataset.data.reduce(
              (total: number, value: number) => total + Number(value), 0
            );
            const percentage = Math.round((dataValue / dataValueTotal) * 100);
            return [
              // `${tooltipItem.dataset.labels[dataIndex]}`,
              `${dataValue} (${percentage}%)`,
            ];
          },
        },
        backgroundColor: (context: any) => {
          if (context.tooltip && context.tooltip.dataPoints.length) {
            const dataIndex = context.tooltip.dataPoints[0].dataIndex;
            return context.tooltip.dataPoints[0].dataset.backgroundColor[
              dataIndex
            ];
          }
          return '#FFF';
        },
        bodyColor: (context: any) => {
          if (context.tooltip && context.tooltip.dataPoints.length) {
            const dataIndex = context.tooltip.dataPoints[0].dataIndex;
            const bgColor =
              context.tooltip.dataPoints[0].dataset.backgroundColor[dataIndex];
            return bgColor === '#FFB84D' ? '#000' : '#FFF';
          }
          return '#FFF';
        },
        bodyFont: {
          weight: 'bold',
          size: 10,
          color: 'red',
        },
      },
    },

    interaction: {
      mode: 'nearest', // Ensures that the closest item is targeted on click
      intersect: true, // Only trigger when directly on the element
    },
    onClick: (event: MouseEvent, elements: any[]) => {
      if (elements.length) {
        const index = elements[0].index;
        const datasetIndex = elements[0].datasetIndex;
        const dataset = this.chart?.data.datasets[datasetIndex] as any;

        if (dataset) {
          dataset.borderWidth = dataset.borderWidth === 5 ? 0 : 5; // Toggle borderWidth
          this.chart?.update();
        } else {
          console.error('Spacing property not found in dataset');
        }
      }
    },
  };




  // chartOptions2: any = {
  //   animation: {
  //     animateRotate: true,
  //     animateScale: true,
  //   },
  //   datalabels: {
  //     // Add this section for data labels
  //     anchor: 'end',
  //     align: 'end',
  //     color: '#fff', // Change color as needed
  //     formatter: (value: number) => {
  //       return value.toFixed(2) + '%'; // Customize how the labels appear
  //     },
  //   },
  //   responsive: false, // Set to false if you want fixed dimensions
  //   plugins: {
  //     legend: {
  //       display: false,
  //       position: 'bottom',
  //       labels: {
  //         boxWidth: 15,
  //         boxHeight: 15,
  //         useBorderRadius: true,
  //         borderRadius: 15,
  //         font: {
  //           size: 15 // Set the font size for the chart labels
  //         }
  //       },
  //     },
  //     tooltip: {
  //       enabled: true, // Disable default tooltip
  //       mode: 'index',
  //       position: 'nearest',
  //       titleColor: '#fff',
  //       padding: 15,
  //       borderColor: 'white',
  //       borderWidth: 1.5,
  //       usePointStyle: false,
  //       bodyAlign: 'left',
  //       cornerRadius: 6,
  //       boxPadding: 5,
  //       callbacks: {
  //         label: (tooltipItem: any) => {
  //           const dataIndex = tooltipItem.dataIndex;
  //           const dataValue = tooltipItem.dataset.data[dataIndex];
  //           const dataValueTotal = tooltipItem.dataset.data.reduce(
  //             (total: number, value: number) => total + Number(value), 0
  //           );
  //           const percentage = Math.round((dataValue / dataValueTotal) * 100);
  //           return [
  //             `${dataValue} (${percentage}%)`,
  //           ];
  //         },
  //       },
  //       backgroundColor: (context: any) => {
  //         if (context.tooltip && context.tooltip.dataPoints.length) {
  //           const dataIndex = context.tooltip.dataPoints[0].dataIndex;
  //           return context.tooltip.dataPoints[0].dataset.backgroundColor[
  //             dataIndex
  //           ];
  //         }
  //         return '#FFF';
  //       },
  //       bodyColor: (context: any) => {
  //         if (context.tooltip && context.tooltip.dataPoints.length) {
  //           const dataIndex = context.tooltip.dataPoints[0].dataIndex;
  //           const bgColor =
  //             context.tooltip.dataPoints[0].dataset.backgroundColor[dataIndex];
  //           return bgColor === '#FFB84D' ? '#000' : '#FFF';
  //         }
  //         return '#FFF';
  //       },
  //       bodyFont: {
  //         weight: 'bold',
  //         size: 10,
  //         color: 'red',
  //       },
  //     },
  //   },

  //   interaction: {
  //     mode: 'nearest', // Ensures that the closest item is targeted on click
  //     intersect: true, // Only trigger when directly on the element
  //   },
  //   onClick: (event: MouseEvent, elements: any[]) => {
  //     if (elements.length) {
  //       const index = elements[0].index;
  //       const datasetIndex = elements[0].datasetIndex;
  //       const dataset = this.chart?.data.datasets[datasetIndex] as any;

  //       if (dataset) {
  //         dataset.borderWidth = dataset.borderWidth === 5 ? 0 : 5; // Toggle borderWidth
  //         this.chart?.update();
  //       } else {
  //         console.error('Spacing property not found in dataset');
  //       }
  //     }
  //   },
  // };

  
}