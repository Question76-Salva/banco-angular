import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BancoService } from '../../services/banco.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  estaAutenticado: boolean = false;

  constructor(
    private BancoService: BancoService, 
    // este objeto nos permite realizar redirecciones
    private router: Router,
    ) { }

  ngOnInit(): void {
    
  }

  async loginGestor(usarioInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    const usuario = usarioInput.value;
    const password = passwordInput.value;

    const ok = await this.BancoService.loginGestor(usuario, password);
    
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
    } else {
      // si la autenticación es correcta,
      //    redireccionar a la ruta '/chat'
      this.router.navigate(['/chat']);
    }
        
    //const msg = (ok) ? 'Autenticación correcta' : 'Autenticación incorrecta';
    //console.log(msg);
    
  }


  loginGestorEnter(event: KeyboardEvent, usarioInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    // usuario ha pulado ENTER 
    //    en la caja de texto del password
    // ejecutamos el mismo código método 'loginGestor()'
    if (event.key === 'Enter') {
      this.loginGestor(usarioInput, passwordInput);
    }   
  }

}
