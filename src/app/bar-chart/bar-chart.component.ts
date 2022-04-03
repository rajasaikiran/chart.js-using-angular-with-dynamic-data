import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit, OnDestroy {
  sub?: Subscription;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  chartData: ChartDataset[] = [
    {
      data: [],
      label: 'Product Used',
      backgroundColor: ['#f00427', '#ffd548', '#00994b'],
      borderColor: ['#f00427', '#ffd548', '#00994b'],
      barThickness: 30,
      hoverBackgroundColor: ['#f00427', '#ffd548', '#00994b'],
    },
  ];
  labels: string[] = ['Apple', 'Samsung', 'OnePlus'];

  options: ChartOptions = {
    scales: {
      gridLines: {
        display: false,
      },
      x: {
        grid: {
          borderColor: 'bold',
          borderWidth: 1,
          display: false,
        },
        ticks: {
          color: '#0ffff',
        },
      },
      y: {
        grid: {
          borderColor: 'bold',
          borderWidth: 1,
          display: false,
        },
        ticks: {
          color: '#0ffff',
          precision: 0,
        },
      },
    },

    plugins: {
      tooltip: {
        intersect: false,
        mode: 'index',
      },
      legend: {
        display: false,
      },
    },
  };

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.CallingFakeAPi();
  }

  CallingFakeAPi() {
    debugger;
    this.sub = this._http
      .get('https://api.coingecko.com/api/v3/exchange_rates')
      .subscribe((data: any) => {
        this.chartData[0].data = [
          data.rates.aed?.value,
          data.rates.brl.value,
          data.rates.cny.value,
          data.rates.dkk.value,
        ];
        this.chart?.update();
        console.log(data);
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
