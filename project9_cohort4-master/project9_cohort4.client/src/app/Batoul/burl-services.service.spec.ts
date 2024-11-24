import { TestBed } from '@angular/core/testing';

import { BUrlServicesService } from './burl-services.service';

describe('BUrlServicesService', () => {
  let service: BUrlServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BUrlServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
