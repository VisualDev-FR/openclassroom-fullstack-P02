import { Participation } from 'src/app/core/models/Participation';


export class OlympicCountry {

    constructor(
        public id: number,
        public country: string,
        public participations: Participation[]
    ) { };

    public TotalMedals(): number {
        return 20;
    }
}
