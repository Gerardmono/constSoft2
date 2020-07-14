import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModeloComponent } from './components/modelo/modelo.component';
import { DesarrolloComponent } from './components/desarrollo/desarrollo.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ListaDesarrollosComponent } from './components/lista-desarrollos/lista-desarrollos.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { AuthGuard } from './guards/auth.guard';
import { DetalleComponent } from './components/detalle/detalle.component';


const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'modelo', component: ModeloComponent},
    {path: 'desarrollo/:id', component: DesarrolloComponent, canActivate: [ AuthGuard ] },
    {path: 'desarrollos', component: ListaDesarrollosComponent, canActivate: [ AuthGuard ] },
    {path: 'principal', component: PrincipalComponent},
    {path: 'detalle/:id', component: DetalleComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'principal' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
