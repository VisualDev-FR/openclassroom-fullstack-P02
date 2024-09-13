import { Component, Input } from '@angular/core';
import { HeaderDatas } from '../core/models/HeaderDatas';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

    @Input() headerDatas!: HeaderDatas;

}
