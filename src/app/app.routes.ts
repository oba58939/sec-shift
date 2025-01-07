import { Routes, provideRouter } from '@angular/router';
import { AppComponent } from './app.component';  // AppComponent をインポート

export const routes: Routes = [
  { path: '', component: AppComponent } // ルートパスに AppComponent を割り当て
];

export const appRoutingProviders = [
  provideRouter(routes)  // provideRouter を使ってルート設定
];
