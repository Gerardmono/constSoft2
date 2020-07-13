import { Component, OnInit } from '@angular/core';
import { Desarrollo } from 'src/app/model/desarrollo';
import { DesarrolloService } from 'src/app/services/desarrollo.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-desarrollos',
  templateUrl: './lista-desarrollos.component.html',
  styleUrls: ['./lista-desarrollos.component.css']
})
export class ListaDesarrollosComponent implements OnInit {

  desarrollos: Desarrollo[];
  cargando = true;

  lat: number = 19.404361;
  lng: number = -99.241635;

  constructor( private desarrolloService: DesarrolloService, private auth: AuthService, private router: Router ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.desarrolloService.getDesarrollos().subscribe( resp => {
        this.desarrollos = resp;
        this.cargando = false;
      });
    }, 1500);
  }

  borrarDesarrollo( desarrollo: Desarrollo, i: number ) {
    console.log(i, desarrollo);

    Swal.fire({
      title: 'Estas seguro?',
      text: `Estas seguro de borrar a ${desarrollo.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp =>{
      if ( resp.value === true) {
        this.desarrollos.splice( i, 1 );
        this.desarrolloService.borrarHeroe( desarrollo.id ).subscribe();
      }
    });
  }

  salir() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
