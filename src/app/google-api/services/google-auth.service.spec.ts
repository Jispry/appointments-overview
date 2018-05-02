import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleAuthService } from './google-auth.service';
import { APICONFIG_TOKEN } from '..';

describe('GoogleAuthService', () => {
  let apiConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GoogleAuthService,
        { provide: APICONFIG_TOKEN, useValue: apiConfig }
      ]
    });
  });

  // ignoer because of gapi injection
  xit('should ...', inject([GoogleAuthService], (service: GoogleAuthService) => {
    expect(service).toBeTruthy();
  }));
});
