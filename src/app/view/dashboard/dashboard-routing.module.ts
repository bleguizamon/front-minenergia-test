import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConsultComponent } from './pages/consult/consult.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';

@Injectable({ providedIn: 'root' })
export class ContacResolve implements Resolve<any> {
    constructor() {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      console.log(route.params['id']);
        const item = route.params['id'] ? route.params['id'] : null;
        console.log(item);
        return item;
    }
}

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'registrar',
        component: RegisterComponent,
      },
      {
        path: ':id/editar',
        component: RegisterComponent,
        resolve: {
          item: ContacResolve
      },
      },
      {
        path: 'consultar',
        component: ConsultComponent,
      },
      {
        path: 'perfil',
        component: ProfileComponent,
      },
      { path: '**', redirectTo: '/dashboard/'}
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
