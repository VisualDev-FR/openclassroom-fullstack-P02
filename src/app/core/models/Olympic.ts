import { Participation } from 'src/app/core/models/Participation';


export interface OlympicCountry {
    id: number,
    country: string,
    participations: Participation[]
}
