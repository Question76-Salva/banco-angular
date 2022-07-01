import { Component, OnInit } from '@angular/core';
import { obtenerLocalizacion } from '../../utilidades/geolocalizacion';
import { TiempoService } from '../../services/tiempo.service';
import { CriptomonedaService } from '../../services/criptomoneda.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  estaGestorAutenticado: boolean = false;
  estaClienteAutenticado: boolean = false;

  reloj!: string;
  minutosRestantes!: number;
  temperatura!: number;
  ciudad!: string;
  precioBticoin!: number;

  constructor(private TiempoService: TiempoService, private CriptomonedaService: CriptomonedaService, private AuthService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.estaGestorAutenticado = this.AuthService.estaAutenticadoGestor();
    this.AuthService.cambiosAutenticacionGestor.subscribe(autenticado => {
      this.estaGestorAutenticado = autenticado;
    })

    this.actualizarReloj();
    this.actualizarMinutosRestantes();
    this.actualizarTemperatura();
    this.actualizarPrecioBitcoin();

    // el callback se ejecuta cada segundo
    setInterval( () => {
      this.actualizarReloj();
      this.actualizarMinutosRestantes();
    }, 1000);
    
  }

  actualizarReloj() {
    const fechaActual = new Date();

    // añadir el 0 a la izq cuando los minutos
    //    estan entre 0 y 9
    let minutos = fechaActual.getMinutes().toString();
      if(minutos.length === 1) {
        minutos = '0' + minutos;
      }

      let segundos = fechaActual.getSeconds().toString();
      if(minutos.length === 1) {
        segundos = '0' + segundos;
      }
      
      this.reloj = `${fechaActual.getHours()}:${minutos}:${segundos}`;
  }

  actualizarMinutosRestantes() {
    const fefchaActual = new Date();

    const fechaSalidaClase = new Date();
    fechaSalidaClase.setHours(20, 30, 0);

    const diffMilisegundos = fechaSalidaClase.getTime() - fefchaActual.getTime();
    this.minutosRestantes = Math.round( diffMilisegundos / 1000 / 60);
    console.log(this.minutosRestantes);
  }

  actualizarTemperatura() {
    obtenerLocalizacion( async(latitud: number, longitud: number) => {
      //console.log(latitud, longitud);
      const datos = await this.TiempoService.obtenerTiempo(longitud, latitud);
      this.temperatura = datos.data[0].temp;
      this.ciudad = datos.data[0].city_name;
      console.log(datos.data[0].temp);
      console.log(datos.data[0].city_name);
    });
  }

  actualizarPrecioBitcoin() {
    this.CriptomonedaService.obtenerPrecioBitcoin( (precioBitcoin: number) => {
      this.precioBticoin = +precioBitcoin;
    });
  }

  onLogout() {
    this.AuthService.desautenticado();

    // redirecciona a la url login/gestor
    this.router.navigate(['login', 'gestor']);
  }


}
