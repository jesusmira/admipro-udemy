import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import {FormsModule} from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';

import {Graficas1Component} from './graficas1/graficas1.component';
import {ProgressComponent} from './progress/progress.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficasDonaComponent } from '../components/graficas-dona/graficas-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


// Temporal




@NgModule({
   declarations: [
       DashboardComponent,
       ProgressComponent,
       Graficas1Component,
       PagesComponent,
       IncrementadorComponent,
       GraficasDonaComponent,
       AccountSettingsComponent
   ],
   exports: [
      DashboardComponent,
      ProgressComponent,
      Graficas1Component,
      PagesComponent
  ],
   imports: [
      SharedModule,
      PAGES_ROUTES,
      FormsModule,
      ChartsModule
   ]
})

export class PagesModule{ }
