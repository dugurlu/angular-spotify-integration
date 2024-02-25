# SpotifyBingo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.1.

## Spotify API

### Register App
https://developer.spotify.com

--> Dashboard --> Create app

Fill out the fields (can be edited later) then click Save.
The Client ID and Client Secret are required for the login to work

### Scopes
All available scopes are listed here:
https://developer.spotify.com/documentation/web-api/concepts/scopes

Configure them in the `scope` property in `auth.config.ts`.


### Config
create src/environments/environment.development.ts - copy src/environments/environment.ts as starting point and fill in with your values 





## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
