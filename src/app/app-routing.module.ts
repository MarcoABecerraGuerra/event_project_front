import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { MenuComponent } from './pages/auth/menu/menu.component';
import { DistritoComponent } from './pages/configuracion/distrito/distrito.component';
import { TipoEventoComponent } from './pages/configuracion/tipo-evento/tipo-evento.component';
import { TrabajadorComponent } from './pages/configuracion/trabajador/trabajador.component';
import { ClienteComponent } from './pages/configuracion/cliente/cliente.component';
import { ContratacionComponent } from './pages/principal/contratacion/contratacion.component';
import { DashboardComponent } from './pages/principal/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'configuracion/distrito', component: DistritoComponent },
  { path: 'configuracion/tipo-evento', component: TipoEventoComponent },
  { path: 'configuracion/trabajador', component: TrabajadorComponent },
  { path: 'configuracion/cliente', component: ClienteComponent },
  { path: 'general/contratacion', component: ContratacionComponent },
  { path: 'general/dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
