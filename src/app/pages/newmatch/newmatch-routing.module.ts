import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewmatchPage } from './newmatch.page';

const routes: Routes = [
  {
    path: '',
    component: NewmatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewmatchPageRoutingModule {}
