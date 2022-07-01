import { Component, OnInit } from '@angular/core';
import { BancoService } from '../../services/banco.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.css']
})
export class LoginClienteComponent implements OnInit {

  estaAutenticado: boolean = false;

  constructor(private BancoService: BancoService, private router: Router, private authService: AuthService ) { }

   // si el usuario está autenticado (el token está almacenado en el localStorage),
   //   entonces se realiza una redirección a /chat
  ngOnInit(): void {
    if (this.authService.estaAutenticadoGestor()) {
      this.router.navigate(['chat']);
    }
  }

  async loginCliente(usarioInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    const usuario = usarioInput.value;
    const password = passwordInput.value;

    const ok = await this.BancoService.loginCliente(usuario, password);
    
    // si ok es true | autenticación correcta
    //    no se muestra la caja de texto del mensaje de error
    //    this.estaAutenticado = false
    // si ok es false | autenticación incorrecta
    //    this.estaAutenticado = true
    this.estaAutenticado = !ok;
    
    // esperamos 5 segundos antes de ocultar la caja
    //    del mensaje de error
    setTimeout(() => {
      this.estaAutenticado = false;
    }, 5000);

    // si la autenticación es incorrecta, 
    //    vaciar el campo de texto del password
    if (ok === false) {
      passwordInput.value = '';
    }
        
    //const msg = (ok) ? 'Autenticación correcta' : 'Autenticación incorrecta';
    //onsole.log(msg);
  }

  loginClienteEnter(event: KeyboardEvent, usarioInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    // usuario ha pulado ENTER 
    //    en la caja de texto del password
    // ejecutamos el mismo código método 'loginCliente()'
    if (event.key === 'Enter') {
      this.loginCliente(usarioInput, passwordInput);
    }   
  }

}
