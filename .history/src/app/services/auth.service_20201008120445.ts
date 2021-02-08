import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../config/oauth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public getuserName: string;

  constructor(private oauthService: OAuthService) {
    this.configureOauthService();
  }

  private configureOauthService() {

    this.oauthService.configure(authConfig);
    this.oauthService.tryLogin({});
  }

  public obtainAccessToken() {
     this.oauthService.initImplicitFlow();
    // this.oauthService.initImplicitFlowInternal();

  }

  public getUserName(): string {
    const claims = this.getUserClaims();
    console.log(claims);
    this.getUserInfo();
    if (claims === null) {
      // window.location.reload();
    } else {
      // tslint:disable-next-line: no-string-literal
      return claims['sub'].split('@')[0];
    }

  }

  public getUserInfo(): string {
    const idToken = this.oauthService.getIdToken();
    // tslint:disable-next-line: no-string-literal
    if (idToken === null) {
     // window.location.reload();
    } else {
      // tslint:disable-next-line: no-string-literal
      return typeof idToken['sub'] !== 'undefined' ? idToken['sub'].toString() : '';

    }
  }

  public getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  public getUserClaims(): object {
    return this.oauthService.getIdentityClaims();
  }

  public isLoggedIn(): boolean {
    if (this.oauthService.getAccessToken() === null) {
      return false;
    }
    return true;
  }

  public logout(): void {
    this.oauthService.logOut();
  }
}
