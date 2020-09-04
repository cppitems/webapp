import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemviewComponent } from './itemview/itemview.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { ReferencesComponent } from './references/references.component';
import { BrowserinfoComponent } from './browserinfo/browserinfo.component';
import { UseroptionsComponent } from './useroptions/useroptions.component';

// const routes: Routes = [];
export const routes: Routes = [
  {
    path: 'item/:idx',
    pathMatch: 'full',
    component: ItemviewComponent,
  },
  {path: 'search', component: ResultsComponent},  
  {path: 'items/all', component: HomeComponent, pathMatch: 'full'},
  {path: 'references', component: ReferencesComponent, pathMatch: 'full'},
  {path: 'browserinfo', component: BrowserinfoComponent, pathMatch: 'full'},
  {path: 'options', component: UseroptionsComponent, pathMatch: 'full'},
  {path: '', redirectTo: '/items/all', pathMatch: 'full'},
  {path: '**', redirectTo: '/items/all'},

];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
