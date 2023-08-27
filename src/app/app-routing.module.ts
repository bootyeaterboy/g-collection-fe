import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserUtils } from '@azure/msal-browser';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MsalGuard } from '@azure/msal-angular';
import { QrScannerComponent } from './components/qr-scanner/qr-scanner.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [MsalGuard],
    canActivateChild: [MsalGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'cards',
        component: CardsComponent,
      },
      {
        path: 'cards/:id',
        component: CardDetailComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'qr-scanner',
        component: QrScannerComponent,
      },
      {
        // Needed for Error routing
        path: 'error',
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Don't perform initial navigation in iframes or popups
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? 'enabledNonBlocking'
          : 'disabled', // Set to enabledBlocking to use Angular Universal
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
