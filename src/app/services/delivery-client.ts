import { Injectable } from "@angular/core";
import { createDeliveryClient, type IDeliveryClient } from "@kontent-ai/delivery-sdk";
import { environment } from "../../environments/environment";
import type { CoreClientTypes } from "../../model";

@Injectable({
  providedIn: "root",
})
export class deliveryClient {
  private readonly client = createDeliveryClient<CoreClientTypes>({
    environmentId: environment.ENVIRONMENT_ID,
    previewApiKey: environment.DELIVERY_API_KEY,
    defaultQueryConfig: {
      usePreviewMode: true,
    },
  });

  getClient(): IDeliveryClient<CoreClientTypes> {
    return this.client;
  }
}
