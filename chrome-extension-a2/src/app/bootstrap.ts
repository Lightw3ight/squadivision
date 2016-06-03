//import 'zone.js';
//import 'reflect-metadata';

import {bootstrap}    from '@angular/platform-browser-dynamic';
import {enableProdMode, provide} from '@angular/core';
import {ROUTER_PROVIDERS } from '@angular/router';
import {LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from '@angular/common';

import {AppComponent} from './appComponent';

enableProdMode();

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, { useValue: '/' }),
    provide(LocationStrategy, { useClass: HashLocationStrategy} )
]);
