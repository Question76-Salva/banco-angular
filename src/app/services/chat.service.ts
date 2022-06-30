import { Injectable } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { MensajeChat } from '../modelos/mensaje-chat';
import { esJSON } from '../utilidades/tipos';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private ws: WebSocket;

  constructor() {

    this.ws = new WebSocket("ws://192.168.1.128:8081");

    this.ws.onopen = () => {
      console.log('conexión establecida correctamente');
      //this.ws.send('hola, soy salva');
    };

    
   }

   // callback es una función que recibe el parámetro mensaje
   //   de tipo string y no retorna nada
   escucharMensajes(callback: (mensaje: MensajeChat) => void): void {
    this.ws.onmessage = (event) => {

      // si el mensaje recibido no tiene formato JSON,
      // si no es JSON, ignoramos el mensaje
      if (!esJSON(event.data)) {
        // finalizar la función
        return;
      }

      const MensajeChat: MensajeChat = JSON.parse(event.data);        
      callback(MensajeChat);      
    };
   }

   enviar(mensajeChat: MensajeChat) {
    // convertir mensaje | de objeto a string
    this.ws.send(JSON.stringify(mensajeChat));
   }
}
