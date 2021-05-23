import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamcalendarPage } from './teamcalendar.page';

const routes: Routes = [
  {
    path: '',
    component: TeamcalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamcalendarPageRoutingModule {}
