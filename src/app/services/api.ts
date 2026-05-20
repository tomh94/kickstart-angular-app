import {inject, Injectable} from '@angular/core';
import {deliveryClient} from './delivery-client';
import {from, map} from 'rxjs';

@Injectable({providedIn: 'root'})
export class Api {
  private deliveryClient = inject(deliveryClient);

  getItems() {
    console.log(this.deliveryClient)
    return from(
      this.deliveryClient
        .getClient()
        .items()
        .type("landing_page")
        .depthParameter(0)
        .toPromise())

      .pipe(
        map(response => response.data)
      );
  }
}
