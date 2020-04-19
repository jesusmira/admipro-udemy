import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
    imports: [
      RouterModule,
      CommonModule,
      PipesModule
    ],
    declarations: [
      HeaderComponent,
      SidebarComponent,
      BreadcrumbsComponent,
      NopagefoundComponent
    ],
    exports: [
      HeaderComponent,
      SidebarComponent,
      BreadcrumbsComponent,
      NopagefoundComponent
    ]
})
export class SharedModule { }
