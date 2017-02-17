import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { GoogleApiModule } from './google-api';
import { ChartsModule } from './charts';
import { AppComponent } from './app.component';
import { EventsCacheService, EventsService, DateTransformService } from './services';
import { CalendarQueryComponent } from './calendar-query/calendar-query.component';
import { EventsOverviewComponent } from './events-overview/events-overview.component';
import { TimeSpanPipe } from './time-span.pipe';

const appRoutes: Routes = [
  { path: 'overview', component: EventsOverviewComponent },
  { path: '**', component: CalendarQueryComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CalendarQueryComponent,
    EventsOverviewComponent,
    TimeSpanPipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    GoogleApiModule,
    ChartsModule
  ],
  providers: [
    EventsCacheService,
    EventsService,
    DateTransformService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
