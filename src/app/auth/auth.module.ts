import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthConfig, OAuthModule, OAuthModuleConfig, OAuthStorage } from 'angular-oauth2-oidc';
import { AuthService } from './auth.service';
import { authConfig } from './auth.config';


export const storageFactory = (): OAuthStorage => {
    return localStorage;
};

export const authAppInitializerFactory = (authService: AuthService): () => Promise<void> => {
    return () => authService.runInitialLoginSequence();
};

export const authModuleConfig: OAuthModuleConfig = {
    resourceServer: {
        allowedUrls: ['https://api.spotify.com'],
        sendAccessToken: true
    }
};

@NgModule({
    imports: [
        HttpClientModule,
        OAuthModule.forRoot(),
    ],
    providers: [
        AuthService,
    ],
})
export class AuthModule {
    static forRoot = (): ModuleWithProviders<AuthModule> => {
        return {
            ngModule: AuthModule,
            providers: [
                {provide: APP_INITIALIZER, useFactory: authAppInitializerFactory, deps: [AuthService], multi: true},
                {provide: AuthConfig, useValue: authConfig},
                {provide: OAuthModuleConfig, useValue: authModuleConfig},
                {provide: OAuthStorage, useFactory: storageFactory},
            ]
        }
    }

    constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
        if (parentModule) {
            throw new Error('AuthModule is already loaded. Import it in the AppModule only');
        }
    }
}
