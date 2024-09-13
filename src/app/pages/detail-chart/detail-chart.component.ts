import { Component, Input, OnInit } from '@angular/core';
import { OlympicCountry } from 'src/app/core/models/Olympic';

@Component({
    selector: 'app-detail-chart',
    templateUrl: './detail-chart.component.html',
    styleUrl: './detail-chart.component.scss'
})
export class DetailChartComponent implements OnInit {

    @Input() olympicCountry!: OlympicCountry;

    multi: any;
    view: [number, number] = [700, 300];
    legend: boolean = true;
    showLabels: boolean = true;
    animations: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showYAxisLabel: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Year';
    yAxisLabel: string = 'Population';
    timeline: boolean = true;

    ngOnInit(): void {

        this.multi = [
            {
                name: "MedalsCount",
                series: this.olympicCountry.participations.map(p => ({ name: p.year, value: p.medalsCount }))
            },
            {
                name: "AthleteCount",
                series: this.olympicCountry.participations.map(p => ({ name: p.year, value: p.athleteCount }))
            }
        ]
    }

}
