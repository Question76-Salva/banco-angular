import { Injectable } from '@angular/core';
import { Respuesta } from '../modelos/respuesta';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor(private AuthService: AuthService) { }

  async loginGestor(usuario: string, password: string): Promise<boolean> {
    const response = await fetch('http://127.0.0.1:8085/login/gestor/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' 
      },
      body: `usuario=${usuario}&password=${password}`
    });
    // devuelve la promesa con los datos
    const datos: Respuesta = await response.json();  
    
    if (datos.ok) {
      this.AuthService.autenticado(datos.data.token, usuario, 'gestor');
    }
    return datos.ok;

  }

  async loginCliente(usuario: string, password: string): Promise<boolean> {
    const response = await fetch('http://127.0.0.1:8085/login/cliente/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' 
      },
      body: `usuario=${usuario}&password=${password}`
    });
    // devuelve la promesa con los datos
    const datos: Respuesta = await response.json(); 
    
    if (datos.ok) {
      this.AuthService.autenticado(datos.data.token, usuario, 'cliente');
    }

    return datos.ok;

  }
}
