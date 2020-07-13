import { Component, OnInit } from '@angular/core';
import { DesarrolloService } from 'src/app/services/desarrollo.service';
import { ActivatedRoute } from '@angular/router';
import { Desarrollo } from 'src/app/model/desarrollo';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  desarrollo = new Desarrollo();
  lat: number = 19.404361;
  lng: number = -99.241635;

  constructor(private desarrolloService: DesarrolloService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
      if ( id!= 'nuevo' ) {
        this.desarrolloService.getDesarrollo( id ).subscribe((resp: Desarrollo)=> {
          this.desarrollo = resp;
          this.desarrollo.id = id;
        })
      }
  }

}
