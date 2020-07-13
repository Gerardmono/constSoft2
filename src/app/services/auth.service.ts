import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
    private apikey = 'AIzaSyDT2FytaI28cbtgB2Z4SvA51UX2FfWFSm8';
    userToken: string;

    constructor( private http: HttpClient ) {
        this.leerToken();
    }

    logout() {
        localStorage.removeItem('token');
    }

    login( usuario: Usuario ) {
        const authData = {
            ...usuario,
            returnSecureToken: true
        };

        return this.http.post(
            `${ this.url }signInWithPassword?key=${ this.apikey }`,
            authData
        ).pipe(
            map( resp => {
                console.log('Entrp en el mapa de RXJS');
                this.guardarToken( resp['idToken']);
                return resp;
            })
        );
    }

    nuevoUsuario( usuario: Usuario ) {
        const authData = {
            ...usuario,
            returnSecureToken: true
        };

        return this.http.post(
            `${ this.url }signUp?key=${ this.apikey }`,
            authData
        ).pipe(
            map( resp => {
                console.log('Entro en el mapa de RXJS');
                this.guardarToken( resp['idToken']);
                return resp;
            })
        );

    }

    private guardarToken( idToken: string ) {
        this.userToken = idToken;
        localStorage.setItem( 'token', idToken );
        let hoy = new Date();
        hoy.setSeconds(3600);
        localStorage.setItem('expira', hoy.getTime().toString())
    }

    leerToken() {
      if ( localStorage.getItem( 'token' ) ) {
        this.userToken = localStorage.getItem( 'token' )
      } else {
        this.userToken = '';
      }
      return this.userToken;
    }

    estaAutenticado(): boolean {
        if (this.userToken.length < 2) {
            return false;
        }
        const expira = Number(localStorage.getItem('expira'));
        if (expira < new Date().getTime() ) {
            return false;
        }
        return true;
    }

}
