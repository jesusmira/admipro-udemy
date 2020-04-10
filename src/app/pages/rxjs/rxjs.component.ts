import { Component, OnInit, OnDestroy } from '@angular/core';

import { retry, map, filter } from 'rxjs/operators';
import { Observable, Subscriber, Subscription } from 'rxjs';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ],
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable()
    .subscribe(
      numero => console.log('Subs: ', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino')
    );

  }
  ngOnDestroy(): void {
   console.log('La pagina se va a cerrar');
   this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }


  regresaObservable(): Observable<any> {
    let contador = 0;

    return new Observable( (observer: Subscriber<any>) => {

      const intervalo = setInterval( () => {

        contador += 1;

        const salida = {
                valor: contador
        };

        observer.next( salida);

       /*  if (contador === 3) {
          clearInterval( intervalo);
          observer.complete();
        } */
        /* if (contador === 2) {
          clearInterval( intervalo);
          observer.error('Auxilio!!');
        } */

      }, 1000);


    }).pipe(
      map( resp => resp.valor),
      filter( (valor, index) => {
        if ((valor % 2) === 1) {
          // es impar
          return true;
        } else {
          // es par
          return false;
        }
      })
    );

  }

}
