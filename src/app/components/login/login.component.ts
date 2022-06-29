import { Component, OnInit } from '@angular/core';
import { BancoService } from '../../services/banco.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private BancoService: BancoService) { }

  ngOnInit(): void {
    
  }

  async loginGestor(usarioInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    const usuario = usarioInput.value;
    const password = passwordInput.value;

    const ok = await this.BancoService.loginGestor(usuario, password);
    
    // si 'ok' es true | autenticación correcta
    // if (ok) {
    //   alert('Autenticación correcta');
    // } else {
    //   alert('Autenticación incorrecta');
    // }
    
    const msg = (ok) ? 'Autenticación correcta' : 'Autenticación incorrecta';
    console.log(msg);
  }

}
