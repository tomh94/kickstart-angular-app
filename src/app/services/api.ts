import { inject, Injectable } from '@angular/core';
import { from, map, type Observable } from 'rxjs';
import type { LandingPageType } from '../../model';
import { deliveryClient } from './delivery-client';

@Injectable({ providedIn: 'root' })
export class Api {
  private readonly client = inject(deliveryClient).getClient();

  getLandingPage(): Observable<LandingPageType | null> {
    return from(
      this.client
        .items<LandingPageType>()
        .type('landing_page')
        .limitParameter(1)
        .depthParameter(2)
        .toPromise()
    ).pipe(map((res) => res.data.items[0] ?? null));
  }



}
