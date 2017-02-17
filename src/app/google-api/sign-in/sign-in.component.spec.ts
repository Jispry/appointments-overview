/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, EventEmitter } from '@angular/core';

import { SignInComponent } from './sign-in.component';
import { GoogleAuthService } from '../services/google-auth.service';

class AuthServiceStub {

  signInStatus: EventEmitter<boolean>;

  constructor() {
    this.signInStatus = new EventEmitter<boolean>();
  }

  emitValue(value: boolean) {
    this.signInStatus.emit(value);
  };
}

describe('SignInComponent', () => {
  describe('Isolated', () => {
    let component: SignInComponent;
    let authServiceMock: GoogleAuthService;

    beforeEach(() => {
      authServiceMock = jasmine.createSpyObj('mockAuthService', ['authorize', 'logOut', 'signInStatus']);

      component = new SignInComponent(authServiceMock, null);
    });

    it('#logIn should call authService', () => {
      component.logIn();

      expect(authServiceMock.authorize).toHaveBeenCalled();
    });

    it('#logOut should call authService', () => {
      component.logOut();

      expect(authServiceMock.logOut).toHaveBeenCalled();
    });

    it('should subscribe to authservice.signInStatus on ngOnInit', () => {
      authServiceMock.signInStatus.subscribe = jasmine.createSpy('subscribe');

      component.ngOnInit();

      expect(authServiceMock.signInStatus.subscribe).toHaveBeenCalled();
    });

    it('should set value after event emited', () => {
      let authStub = new AuthServiceStub();
      let ngZoneStub = {
        run: function(a){
          a();
        }
      };

      component = new SignInComponent(<any>authStub, <any>ngZoneStub);
      component.ngOnInit();

      authStub.emitValue(true);

      expect(component.isSignedIn).toBeTruthy();
    });
  });

  describe('TestBed', () => {
    let component: SignInComponent;
    let fixture: ComponentFixture<SignInComponent>;
    let authServiceStub = {
      signInStatus: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [SignInComponent],
        providers: [
          { provide: GoogleAuthService, useClass: AuthServiceStub }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SignInComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set value after event emited', () => {
      let authService = <AuthServiceStub>fixture.debugElement.injector.get(GoogleAuthService);

      authService.emitValue(true);

      expect(component.isSignedIn).toBeTruthy();
    });
  });
});
