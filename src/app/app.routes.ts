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
import { PortfolioAllocationDetailsComponent } from './portfolioAllocationDetails/portfolioAllocationDetails.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmOTPComponent } from './confirm-otp/confirm-otp.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AdminAuthGuard } from './guard/admin-auth.guard';
import { corportateAuthGuard } from './guard/corportate-auth.guard';

export const routes: Routes = [

    // unprotected routes
    { path: '', component: RootComponent, pathMatch: 'full' },
    
    // protected routes
    // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent },
    { path: 'confirm-otp', component: ConfirmOTPComponent },
    { path: 'login', component: LoginComponent, canActivate: [corportateAuthGuard] }, // AuthGuard for user routes
    { path: 'dashboard', component: DashboardComponent, canActivate: [corportateAuthGuard] },
    { path: 'admin-login', component: AdminLoginComponent }, // Admin login route
    { path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard] },  // Admin route
    { path: 'super-admin', component: SuperAdminComponent, canActivate: [AdminAuthGuard] },
    { path: 'portfolioAllocationDetails', component: PortfolioAllocationDetailsComponent, canActivate: [corportateAuthGuard] },
    // { path: 'investor-profile', component: InvestorProfileComponent, canActivate: [AuthGuard] },
    // { path: 'investment', component: InvestmentComponent, canActivate: [AuthGuard] },
    // { path: 'redemption', component: RedemptionComponent, canActivate: [AuthGuard] },
    // { path: 'conversion', component: ConversionComponent, canActivate: [AuthGuard] },
    { path: 'reports', component: ReportsComponent, canActivate: [corportateAuthGuard]},
    { path: 'change-password', component: ChangePasswordComponent, canActivate: [corportateAuthGuard]},
    { path: 'logout', component: LogoutComponent },

    // Wildcard route
    { path: '**', redirectTo: 'login' }


];
