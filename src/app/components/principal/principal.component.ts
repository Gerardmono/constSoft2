import { Component, OnInit } from '@angular/core';
import { Desarrollo } from 'src/app/model/desarrollo';
import { DesarrolloService } from 'src/app/services/desarrollo.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  desarrollos: Desarrollo[];
  cargando: boolean= true;

  constructor( private desarrolloService: DesarrolloService ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.desarrolloService.getDesarrollos().subscribe( resp => {
        this.desarrollos = resp;
        this.cargando = false;
      });
    }, 1500);
  }

}
