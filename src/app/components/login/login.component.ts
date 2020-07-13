import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    usuario: Usuario;
    recordarme: boolean;

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit() {
        this.usuario = new Usuario();
        if ( localStorage.getItem('email') ) {
            this.usuario.email = localStorage.getItem('email');
            this.recordarme = true;
        }
    }

    login( form: NgForm ) {

        if ( form.invalid ) {
            return ;
        }

        Swal.fire({
            allowOutsideClick: false,
            text: 'Espere por favor',
            icon: 'info'
        });
        Swal.showLoading();

        console.log('Entro al login');
        console.log(this.usuario);
        console.log( form );
        this.auth.login( this.usuario ).subscribe( resp => {
            console.log(resp);
            Swal.close();
            if (this.recordarme) {
                localStorage.setItem('email', this.usuario.email);
            }
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
