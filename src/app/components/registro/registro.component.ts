import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit(): void {
      this.usuario = new Usuario();
      // this.usuario.email = 'correo@correo.com';
  }

  onSubmit( form: NgForm ) {
      if ( form.invalid ) {
          return ;
      }

      console.log('Formulario enviado');
      console.log(this.usuario);
      console.log(form);
      Swal.fire({
          allowOutsideClick: false,
          text: 'Espere por favor',
          icon: 'info'
      });
      Swal.showLoading();

      this.auth.nuevoUsuario( this.usuario ).subscribe( resp => {
          console.log(resp);
          Swal.close();
          this.router.navigateByUrl('/desarrollos');
      }, (err) => {
          console.log( err.error.error.message );
          Swal.fire({
              text: err.error.error.message,
              icon: 'error',
              title: 'Erroe al autenticar'
          });
    });

  }

}
