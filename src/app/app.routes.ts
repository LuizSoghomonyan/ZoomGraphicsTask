import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {UserPersonalComponent} from "./components/user-personal/user-personal.component";

export const routes: Routes = [
  {path: '', redirectTo: '/user-table', pathMatch: 'full'},
  {
    path: 'user-table',
    loadComponent:  () => import('./components/user-table/user-table.component')
                                .then((x) => x.UserTableComponent)
  },
  {path: 'user-table/personal/:id', component: UserPersonalComponent},
  {path: '**', component: PageNotFoundComponent}

];
