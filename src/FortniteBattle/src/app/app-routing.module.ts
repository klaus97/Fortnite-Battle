import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'notizie', loadChildren: './pages/notizie/notizie.module#NotiziePageModule', canActivateChild: [AuthGuard] },
  { path: 'tornei', loadChildren: './pages/tornei/tornei.module#TorneiPageModule', canActivate: [AuthGuard] },
  { path: 'dettaglio-torneo', loadChildren: './pages/dettaglio-torneo/dettaglio-torneo.module#DettaglioTorneoPageModule',
    canActivate: [AuthGuard] },
  { path: 'crea-torneo', loadChildren: './pages/crea-torneo/crea-torneo.module#CreaTorneoPageModule', canActivate: [AuthGuard] },
  { path: 'classifica', loadChildren: './pages/classifica/classifica.module#ClassificaPageModule', canActivate: [AuthGuard] },
  { path: 'armi', loadChildren: './pages/armi/armi.module#ArmiPageModule', canActivate: [AuthGuard] },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'statistiche', loadChildren: './pages/statistiche/statistiche.module#StatistichePageModule', canActivate: [AuthGuard] },
  { path: 'profilo', loadChildren: './pages/profilo/profilo.module#ProfiloPageModule', canActivate: [AuthGuard] },
  { path: 'modifica-profilo', loadChildren: './pages/modifica-profilo/modifica-profilo.module#ModificaProfiloPageModule',
    canActivate: [AuthGuard] },
  { path: 'modifica-avatar', loadChildren: './pages/modifica-avatar/modifica-avatar.module#ModificaAvatarPageModule',
    canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
