import { Injectable } from '@angular/core';
import {createDeliveryClient, IDeliveryClient} from '@kontent-ai/delivery-sdk';
import { CoreClientTypes} from '../../model';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class deliveryClient {
  private readonly client = createDeliveryClient<CoreClientTypes>({
    environmentId: environment.ENVIRONMENT_ID,
    previewApiKey: environment.DELIVERY_API_KEY,
  });

  getClient(): IDeliveryClient<CoreClientTypes> {
    return this.client;
  }
}
