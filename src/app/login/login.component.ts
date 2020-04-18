import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;

  email: string;
  auth2: any;

  constructor( public router: Router,
               // tslint:disable-next-line: variable-name
               public _usuarioService: UsuarioService,
               // tslint:disable-next-line: variable-name
               public _ngZone: NgZone) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '991966068122-okv71pc1dftehjco0259pqmko71rns0f.apps.googleusercontent.com',
        cookiepolicy: 'sigle_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn( document.getElementById('btnGoogle'));
    });
  }

  attachSignIn( element ) {

    this.auth2.attachClickHandler( element, {}, googleUser => {

      // let profile = googleUser.getBasicProfile();
      // console.log( profile);

      let token = googleUser.getAuthResponse().id_token;
      // console.log(token);

      this._usuarioService.loginGoogle(token)
            .subscribe(() => this._ngZone.run(() => this.router.navigate(['/dashboard'])) );
    });
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
            .subscribe( correcto => this.router.navigate(['/dashboard']));

    console.log(forma.valid);
    console.log(forma.value);

    // this.router.navigate(['/dashboard']);
  }

}
