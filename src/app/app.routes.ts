import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

export const appRoutes: Routes = [
  { path: '', component: AppComponent } // ルートパスに AppComponent を割り当て
];

export const appRoutingProviders = [
  provideRouter(appRoutes)
];
