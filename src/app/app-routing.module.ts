import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { LoginClienteComponent } from './components/login-cliente/login-cliente.component';
import { NoencontradoComponent } from './components/noencontrado/noencontrado.component';
import { GestoresComponent } from './components/gestores/gestores.component';


const routes: Routes = [
  // ruta raíz
  { path: '', redirectTo: '/login/gestor', pathMatch: 'full' },
  { path: 'login/gestor', component: LoginComponent },
  { path: 'login/cliente', component:  LoginClienteComponent},
  { path: 'chat', component: ChatComponent},
  { path: 'gestores', component: GestoresComponent},

  // 404 | última ruta | ** -> lo que sea...
  { path: '**', component: NoencontradoComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
