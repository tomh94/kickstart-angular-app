import { TestBed } from "@angular/core/testing";

import { deliveryClient } from "./delivery-client";

describe("Client", () => {
  let service: deliveryClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(deliveryClient);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
