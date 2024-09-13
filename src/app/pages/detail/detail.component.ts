import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';


@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

    olympicCountry!: OlympicCountry | undefined;

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

    constructor(
        private route: ActivatedRoute,
        private olympicService: OlympicService,
        private router: Router,
    ) { }

    ngOnInit(): void {

        this.route.paramMap.subscribe(params => {

            const countryName: string = params.get("name")!;

            if (!countryName) {
                this.redirectNotFound();
                return;
            }

            this.olympicService
                .getOlympics()
                .subscribe(countries => {
                    this.olympicCountry = countries.find(country => country.country == countryName)

                    if (!this.olympicCountry) {
                        this.redirectNotFound();
                        return;
                    }

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
                });

            console.log(this.olympicCountry);
        });
    }

    redirectNotFound() {
        this.router.navigate(["/**"]);
    }
}
