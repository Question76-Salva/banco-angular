import { Component, OnInit } from '@angular/core';
import { obtenerLocalizacion } from '../../utilidades/geolocalizacion';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  reloj!: string;
  minutosRestantes!: number;

  constructor() { }

  ngOnInit(): void {

    this.actualizarReloj();
    this.actualizarMinutosRestantes();
    this.actualizarTemperatura();

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
    obtenerLocalizacion( (latitud: number, longitud: number) => {
      console.log(latitud, longitud);
    });
  }


}
