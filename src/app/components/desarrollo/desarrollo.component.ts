import { Component, OnInit } from '@angular/core';
import { Desarrollo } from 'src/app/model/desarrollo';
import { NgForm } from '@angular/forms';
import { DesarrolloService } from '../../services/desarrollo.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-desarrollo',
  templateUrl: './desarrollo.component.html',
  styleUrls: ['./desarrollo.component.css']
})
export class DesarrolloComponent implements OnInit {
    private image: any;
    desarrollo = new Desarrollo();
    estados = ["Ciudad de México", "Hidalgo", "Veracruz", "Chihuahua"];

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

    guardar( form: NgForm ) {

        if (form.invalid) {
            console.log("ocurrio un error");
            return;
        }

        Swal.fire({
          title: 'Espere',
          text: 'Guardando informacion',
          icon: 'info',
          allowOutsideClick: false
        });
        Swal.showLoading();

        let peticion: Observable<any>;

        if (this.desarrollo.id) {
            peticion = this.desarrolloService.actualizarDesarrollo( this.desarrollo );
        } else {
            peticion = this.desarrolloService.crearDesarrollo( this.desarrollo );
        }



        peticion.subscribe( resp => {
          // console.log(resp);
          // console.log("Funciono");
          Swal.fire({
            title: this.desarrollo.nombre,
            text: 'Se guardo correctamente',
            icon: 'success'
          });
        });

    }

    readUrl(event: any) {
        // console.log(event.target.files);

        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.desarrollo.image = event.target.result;
            }
            this.image = event.target.files[0];
            reader.readAsDataURL(this.image);
            // console.log(this.image);
        }
    }

}
