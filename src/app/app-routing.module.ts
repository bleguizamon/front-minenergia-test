import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./view/dashboard/dashboard.module').then(mod => mod.DashboardModule),
  },
  { path: '**', redirectTo: '/dashboard' } // por defecto redirige al home porque la api no tiene login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
