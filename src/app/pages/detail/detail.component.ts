import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChartData } from 'src/app/core/models/ChartData';
import { HeaderDatas } from 'src/app/core/models/HeaderDatas';
import { OlympicService } from 'src/app/core/services/olympic.service';


@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit, OnDestroy {

    private subscription = new Subscription();

    chartDatas!: { name: string, series: ChartData[] }[];
    headerDatas!: HeaderDatas;

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

        let olympicSub!: Subscription;
        let paramSub = this.route.paramMap.subscribe(params => {

            const countryName: string = params.get("name")!;

            if (!countryName) {
                this.redirectNotFound();
                return;
            }

            olympicSub = this.olympicService
                .getOlympics()
                .subscribe(countries => {

                    let olympicCountry = countries.find(country => country.country == countryName)!
                    let participations = olympicCountry.participations;

                    if (!olympicCountry) {
                        this.redirectNotFound();
                        return;
                    }

                    this.chartDatas = [
                        {
                            name: "MedalsCount",
                            series: participations.map(p => ({ name: p.year.toString(), value: p.medalsCount }))
                        },
                        {
                            name: "AthleteCount",
                            series: participations.map(p => ({ name: p.year.toString(), value: p.athleteCount }))
                        }
                    ]

                    this.headerDatas = {
                        title: olympicCountry.country,
                        stats: [
                            {
                                label: "Number of entries",
                                value: participations.length
                            },
                            {
                                label: "Total number medals",
                                value: participations.reduce((sum, country) => sum + country.medalsCount, 0)
                            },
                            {
                                label: "Total number of athletes",
                                value: participations.reduce((sum, country) => sum + country.athleteCount, 0)
                            },
                        ]
                    }
                });
        });

        this.subscription.add(paramSub);
        this.subscription.add(olympicSub);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    redirectNotFound() {
        this.router.navigate(["/**"]);
    }
}
