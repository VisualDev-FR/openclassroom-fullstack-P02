import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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

        let countryName: string | null = null;
        this.route.paramMap.subscribe((param: ParamMap) => countryName = param.get('name'));

        if (!countryName) {
            this.redirectNotFound();
            return;
        }

        this.subscription.add(
            this.olympicService
                .getOlympics()
                .subscribe(countries => {

                    let olympicCountry = countries.find(country => country.country == countryName)!

                    if (!olympicCountry) {
                        this.redirectNotFound();
                        return;
                    }

                    let participations = olympicCountry.participations;

                    this.chartDatas = [
                        {
                            name: "MedalsCount",
                            series: participations.map(p => ({ name: p.year.toString(), value: p.medalsCount }))
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
                })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    redirectNotFound() {
        this.router.navigate(["/**"]);
    }
}
