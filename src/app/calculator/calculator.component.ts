import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
  ApexFill,
  ApexDataLabels,
  ApexYAxis,
  ApexGrid
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
};
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  
  allSum:any = 0

  ServiceLevel: number = 0
  inventioryServiceValue: number = 75;
  yearlySaleValue: number = 1000000;
  grossMarginValue: number = 20;

  serviceLevelResult = 0
  efficiencySavings = 0
  reductionInventory = 0


  empVale:any;
  averageSalaryValue:number = 50000

  averageInventoryValue:number = 1000000
  wasteValue: any = 0.5


  myForm: FormGroup = new FormGroup({
    employed: new FormControl('')
  });
  chartOptions:any
  constructor(private formBuilder: FormBuilder) {
    
    
   }
  ngOnInit(): void {
    this.chartOptions = {
      
      series: [44, 50, 13],
      
      chart: {
        type: "donut",
        
      },
      
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.sercieLevelFormula()
    this.myForm.controls['employed'].setValue('2')
    this.efficiencySavingsFormula()
    this.reductionInventoryFormula()
    this.chartChange()
    this.allAmount()

  }
  allAmount(){
    this.allSum = Math.round(this.serviceLevelResult+this.efficiencySavings+this.reductionInventory)
  }
  chartChange(){
    this.chartOptions.series=[]
    this.chartOptions.series.push(this.serviceLevelResult)
    this.chartOptions.series.push(this.efficiencySavings)
    this.chartOptions.series.push(this.reductionInventory)
  }
  sercieLevelFormula(){
    this.serviceLevelResult = Math.round((this.yearlySaleValue * this.grossMarginValue/100) * 0.02 * 0.30)
    this.chartChange()
    this.allAmount()
  }
  efficiencySavingsFormula(){
    this.efficiencySavings =  Math.round((this.myForm.value.employed * this.averageSalaryValue) * 0.30)
    this.chartChange()
    this.allAmount()
  }
  reductionInventoryFormula(){
    
    this.reductionInventory = Math.round( (this.averageInventoryValue * this.wasteValue/100) * 0.50)
    this.chartChange()
    this.allAmount()
  }


  inventioryServiceLevel(value: any) {
    this.inventioryServiceValue = value;
    if (value) {
      return Math.round(value) + '%'; 
    }
    return value;
  }
  formatLabel(value:number){
    if (value) {
      return '$'+Math.round(value/1000000)+'M';
    }
    return value;
  }
  percentagelable(value:number){
    if (value) {
      return Math.round(value)+'%';
    }
    return value;
  }
  percentagelable2(value:number){
    if (value) {
      return value+'%';
    }
    return value;
  }
  dollor(value:number){
    if (value) {
      return '$'+value;
    }
    return value;
  }
  yearlySale(event:any) {
    this.yearlySaleValue = event.value
    
    this.sercieLevelFormula()
    
    if (event.value) {
      console.log('oidosfidsifu',event.value)
      return Math.round(event.value/1000000)+'M';
    }
    return event.value;
  }
  inventory(event: any) {
    this.averageInventoryValue = event.value
    this.reductionInventoryFormula()
    if (event.value) {
      return Math.round(event.value/10000000) + 'M';
    }
    return event.value;
  }
  grossMargin(event:any) {
    this.grossMarginValue = event.value;
    this.sercieLevelFormula()
    
    
    if (event.value) {
      return Math.round(event.value) + '%';
    }
    return event.value;
  }
  employees(value: number) {
    this.efficiencySavingsFormula()
    if (value) {
      return Math.round(value) + '%';
    }
    return value;
  }
  averageSalary(event: any) {
    
    this.averageSalaryValue = event.value
    this.efficiencySavingsFormula()
    if (event.value) {
      return  '$'+event.value;
    }
    
    return event.value;
  }
  waste(event:any) {
    this.wasteValue = event.value
    this.reductionInventoryFormula()
    if (event.value) {
      return event.value + '%';
    }
    return event.value;
  }
  
}
