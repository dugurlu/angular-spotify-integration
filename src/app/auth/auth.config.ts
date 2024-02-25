import { AuthConfig, OAuthStorage } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

export const authConfig: AuthConfig = {
    // issuer: 'https://accounts.spotify.com',
    loginUrl: 'https://accounts.spotify.com/oauth2/v2/auth',
    userinfoEndpoint: 'https://accounts.spotify.com/oidc/userinfo/v1',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
    redirectUri: window.location.origin + '/',
    clientId: environment.spotify.clientId,
    responseType: 'code',
    oidc: false,
    scope: 'playlist-read-private playlist-read-collaborative user-library-read',
    showDebugInformation: true,
    clearHashAfterLogin: false,
    nonceStateSeparator: 'semicolon',
    // strictDiscoveryDocumentValidation: false,
    // requireHttps: false,
    useSilentRefresh: true
}

export const localStorageOAuthStorage = (): OAuthStorage => {
    return localStorage;
}