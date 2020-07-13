import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModeloComponent } from './components/modelo/modelo.component';
import { DesarrolloComponent } from './components/desarrollo/desarrollo.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { DesarrolloService } from './services/desarrollo.service';
import { ListaDesarrollosComponent } from './components/lista-desarrollos/lista-desarrollos.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { DetalleComponent } from './components/detalle/detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    ModeloComponent,
    DesarrolloComponent,
    LoginComponent,
    RegistroComponent,
    ListaDesarrollosComponent,
    PrincipalComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, ''), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBPUt_UllX5VOTieYssc2oFp0WTWql-toQ'
    })
  ],
  providers: [
    DesarrolloService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
