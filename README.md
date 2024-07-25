Angular Front-end application

BOOK:
Full Stack AngularJS for Java Developer (with Spring RESTful) -> Angular (with Bootstrap) ipv AngularJS

Now install Angular and Bootstrap ....

Node.js
website: https://nodejs.org

Check:
node --version -> v20.9.0

NPM (installed with Node.js)

Check:
npm -v -> 10.2.4

GIT
website: https://git-scm.com

Check:
git --version -> 2.41.0

Angular CLI
install: npm install --global @angular/cli@17.0.0

check:
ng version -> 17.0.0

create project:
ng new AngularSpringbootPostgres

> > >

# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.0.

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
<<<

Bootstrap (Font-Awesome)
install:
npm install bootstrap@4.1.1
npm install font-awesome@4.7.0

add to angular.json ("architect": "styles")
"node_modules/bootstrap/dist/css/bootstrap.css"
"node_modules/font-awesome/css/font-awesome.css"

JSON-SERVER (Dummy Rest Server)
install:
npm install --save_dev json-server@0.12.1

add to package.json
"scripts":{
"json": "json-server data.js -p 3500"
}

run: npm run json

update .gitignore

## SOLVING PROBLEMS

WITH CORS:

- check the URL used (e.g. .../api/tutorials/find iso .../api/tutorial/find)
- check the HTTP method used (e.g. PUT iso POST)

INTER COMPONENT COMMUNICATION

A component can be included into another component

e.g: constructor(public tutorialsService: TutorialsService, private router: Router, private com: TutorialListComponent)
TutorialListComponent must me annotated @Injectable

## OutOfMemory

When restarting application from code an OutOfMemory was encountered

increased memory usage

-Xms1024m -Xmx2048m

## Uploading Files

with a maximum of 100MB
