import { Routes } from '@angular/router';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvestorProfileComponent } from './investor-profile/investor-profile.component';
import { InvestmentComponent } from './investment/investment.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { ConversionComponent } from './conversion/conversion.component';
import { ReportsComponent } from './reports/reports.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';
import { PortfolioAllocationDetailsComponent } from './portfolioAllocationDetails/portfolioAllocationDetails.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmOTPComponent } from './confirm-otp/confirm-otp.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [

    // unprotected routes
    { path: '', component: RootComponent, pathMatch: 'full' },
    
    // protected routes
    // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent}, // Guard for login page
    { path: 'confirm-otp', component: ConfirmOTPComponent}, // Guard for login page
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] }, // Guard for login page
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'portfolioAllocationDetails', component: PortfolioAllocationDetailsComponent, canActivate: [AuthGuard] },
    // { path: 'investor-profile', component: InvestorProfileComponent, canActivate: [AuthGuard] },
    // { path: 'investment', component: InvestmentComponent, canActivate: [AuthGuard] },
    // { path: 'redemption', component: RedemptionComponent, canActivate: [AuthGuard] },
    // { path: 'conversion', component: ConversionComponent, canActivate: [AuthGuard] },
    { path: 'reports', component: ReportsComponent },
    { path: 'change-password', component: ChangePasswordComponent,},
    { path: 'logout', component: LogoutComponent },

    // Wildcard route
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Your home route
    { path: '**', redirectTo: '/home' } // Wildcard route


];
