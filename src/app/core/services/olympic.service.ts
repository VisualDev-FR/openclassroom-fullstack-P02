import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'd3';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, find, tap } from 'rxjs/operators';
import { OlympicCountry } from 'src/app/core/models/Olympic';



@Injectable({
    providedIn: 'root',
})
export class OlympicService {

    private olympicUrl = './assets/mock/olympic.json';

    constructor(private http: HttpClient) { }

    getOlympics(): Observable<OlympicCountry[]> {
        return this.http.get<OlympicCountry[]>(this.olympicUrl);
    }
}
