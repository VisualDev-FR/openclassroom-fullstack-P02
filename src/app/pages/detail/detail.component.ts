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

    olympicCountry!: OlympicCountry | null;

    constructor(
        private route: ActivatedRoute,
        private olympicService: OlympicService,
        private router: Router,
    ) { }

    ngOnInit(): void {

        this.route.paramMap.subscribe(params => {

            const countryName: string = params.get("name")!;

            this.olympicCountry = this.olympicService.getOlympic(countryName);

            if (!this.olympicCountry) {
                this.router.navigate(["/**"]);
                return;
            }

            console.log(this.olympicCountry);
        });
    }
}
