import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardChartComponent } from './pages/dashboard-chart/dashboard-chart.component';
import { DetailChartComponent } from './pages/detail-chart/detail-chart.component';
import { DetailComponent } from './pages/detail/detail.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        DashboardChartComponent,
        DetailChartComponent,
        DetailComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxChartsModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
