/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleAuthService } from './google-auth.service';

describe('GoogleAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleAuthService]
    });
  });

  xit('should ...', inject([GoogleAuthService], (service: GoogleAuthService) => {
    expect(service).toBeTruthy();
  }));
});
