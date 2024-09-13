import { Component, input, Input, OnInit } from '@angular/core';
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

    view: [number, number] = [700, 400];
    gradient: boolean = false;
    showLegend: boolean = false;
    showLabels: boolean = true;
    isDoughnut: boolean = false;
    single!: ChartData[];

    ngOnInit(): void {

        this.single = this.olympics.map(country => ({ name: country.country, value: this.TotalMedals(country) }));
    }

    TotalMedals(country: OlympicCountry): number {
        let count: number = 0;

        for (let participation of country.participations) {
            count += participation.medalsCount;
        }

        return count;
    }

    onSelect(data: any): void {
        console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    }

    onActivate(data: any): void {
        console.log('Activate', JSON.parse(JSON.stringify(data)));
    }

    onDeactivate(data: any): void {
        console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }
}
