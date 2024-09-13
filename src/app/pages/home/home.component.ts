import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { ChartData } from 'src/app/core/models/ChartData';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

    public olympicCountries!: OlympicCountry[];

    charDatas!: ChartData[];
    view: [number, number] = [700, 400];
    gradient: boolean = false;
    showLegend: boolean = false;
    showLabels: boolean = true;
    isDoughnut: boolean = false;
    animation: boolean = false;

    constructor(
        private olympicService: OlympicService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.olympicService.getOlympics().subscribe(countries => {
            this.olympicCountries = countries;
            this.charDatas = this.olympicCountries.map(country => ({ name: country.country, value: this.totalMedals(country) }));
        });
    }

    ngOnDestroy(): void {
        // TODO: unsubscribe from olympicService
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
