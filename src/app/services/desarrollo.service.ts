import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Desarrollo } from '../model/desarrollo';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DesarrolloService {

  private url = 'https://login-app-b15ea.firebaseio.com';

  private PATH = 'img';
  progreso: number = 0;
  constructor(private http: HttpClient) { }

  uploadImage(){  }

  crearDesarrollo( desarrollo: Desarrollo){

    return this.http.post(`${this.url}/desarrollos.json`, desarrollo).pipe(
      map( (resp:any) => {
        desarrollo.id = resp.name;
        return desarrollo;
      })
    );

  }

  getDesarrollos() {
    return this.http.get(`${this.url}/desarrollos.json`).pipe(
      map( this.crearArreglo ));
  }

  private crearArreglo( DesarrollosObj: Object ) {
    const desarrollos: Desarrollo[] = [];
    if (DesarrollosObj === null) {
      return [];
    }
    Object.keys( DesarrollosObj ).forEach( key => {
      const desarrollo: Desarrollo = DesarrollosObj[key];
      desarrollo.id = key;
      desarrollos.push(desarrollo);
    });
    return desarrollos;
  }

  actualizarDesarrollo( desarrollo: Desarrollo ) {
    const desarrolloTemp = {
      ...desarrollo
    };
    delete desarrolloTemp.id;
    return this.http.put(`${this.url}/desarrollos/${desarrollo.id}.json`, desarrolloTemp)
  }

  getDesarrollo( id: string ) {
    return this.http.get(`${this.url}/desarrollos/${id}.json`);
  }

  borrarDesarrollo( id: string ) {
    return this.http.delete(`${this.url}/desarrollos/${id}.json`);
  }

}


// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }
