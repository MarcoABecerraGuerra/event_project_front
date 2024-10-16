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
    EditContratacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
