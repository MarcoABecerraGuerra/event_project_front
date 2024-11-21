import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { MenuComponent } from './pages/auth/menu/menu.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './pages/configuracion/usuario/usuario.component';
import { RolComponent } from './pages/configuracion/rol/rol.component';
import { ContratacionComponent } from './pages/principal/contratacion/contratacion.component';
import { DistritoComponent } from './pages/configuracion/distrito/distrito.component';
import { ClienteComponent } from './pages/configuracion/cliente/cliente.component';
import { TrabajadorComponent } from './pages/configuracion/trabajador/trabajador.component';
import { NewDistritoComponent } from './pages/configuracion/distrito/new-distrito/new-distrito.component';
import { EditDistritoComponent } from './pages/configuracion/distrito/edit-distrito/edit-distrito.component';
import { NewContratacionComponent } from './pages/principal/contratacion/new-contratacion/new-contratacion.component';
import { EditContratacionComponent } from './pages/principal/contratacion/edit-contratacion/edit-contratacion.component';
import { TipoEventoComponent } from './pages/configuracion/tipo-evento/tipo-evento.component';
import { NewClienteComponent } from './pages/configuracion/cliente/new-cliente/new-cliente.component';
import { EditClienteComponent } from './pages/configuracion/cliente/edit-cliente/edit-cliente.component';
import { NewTipoEventoComponent } from './pages/configuracion/tipo-evento/new-tipo-evento/new-tipo-evento.component';
import { EditTipoEventoComponent } from './pages/configuracion/tipo-evento/edit-tipo-evento/edit-tipo-evento.component';
import { EditTrabajadorComponent } from './pages/configuracion/trabajador/edit-trabajador/edit-trabajador.component';
import { NewTrabajadorComponent } from './pages/configuracion/trabajador/new-trabajador/new-trabajador.component';
import { DashboardComponent } from './pages/principal/dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    SidebarComponent,
    AlertComponent,
    UsuarioComponent,
    RolComponent,
    ContratacionComponent,
    DistritoComponent,
    ClienteComponent,
    TrabajadorComponent,
    NewDistritoComponent,
    EditDistritoComponent,
    NewContratacionComponent,
    EditContratacionComponent,
    TipoEventoComponent,
    NewClienteComponent,
    EditClienteComponent,
    NewTipoEventoComponent,
    EditTipoEventoComponent,
    EditTrabajadorComponent,
    NewTrabajadorComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
