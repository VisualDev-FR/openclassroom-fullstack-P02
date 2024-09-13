import { Component, input, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LegendPosition } from '@swimlane/ngx-charts';
import { OlympicCountry } from 'src/app/core/models/Olympic';


interface ChartData {
    name: string;
    value: number;
}


@Component({
    selector: 'app-dashboard-chart',
    templateUrl: './dashboard-chart.component.html',
    styleUrl: './dashboard-chart.component.scss'
})
export class DashboardChartComponent implements OnInit {

    @Input() olympics!: OlympicCountry[];

    charDatas!: ChartData[];
    view: [number, number] = [700, 400];
    gradient: boolean = false;
    showLegend: boolean = false;
    showLabels: boolean = true;
    isDoughnut: boolean = false;
    animation: boolean = false;

    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void {

        this.charDatas = this.olympics.map(country => ({ name: country.country, value: this.totalMedals(country) }));
    }

    totalMedals(country: OlympicCountry): number {

        let count: number = 0;

        for (let participation of country.participations) {
            count += participation.medalsCount;
        }

        return count;
    }

    onSelect(data: ChartData): void {
        this.router.navigate(["/detail", data.name]);
    }

}
