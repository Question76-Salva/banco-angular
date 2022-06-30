import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // atributos
  private token!: string;                       // guardar token
  private usuario!: string;                     // guardar nombre usuario
  private tipoUsuario!: "gestor" | "cliente";   // guardar tipo de usuario
  private fechaLogin!: Date;                    // guardar fecha

  constructor() { }

  autenticado(token: string, usuario: string, tipoUsuario: "gestor" | "cliente") {
    this.token = token;
    this.usuario = usuario;
    this.tipoUsuario = tipoUsuario;
    this.fechaLogin = new Date();
  }

  desautenticado() {
    this.token = '';
    this.usuario = '';
  }
}
