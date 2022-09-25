import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMedicationComponent } from './all-medication/all-medication.component';
import { HomeComponent } from './home.component';
import { LayoutComponent } from './layout/layout.component';
import { MyMedicationComponent } from './my-medication/my-medication.component';
import { UserLoginComponent } from './user-management/user-login/user-login.component';
import { UserRegisterComponent } from './user-management/user-register/user-register.component';


 const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'home',component: HomeComponent, title:'Medication Mock-up - Dashboard' },      
      {path: 'my-medication',component: MyMedicationComponent, title:'Medication Mock-up - my medication - Dashboard' },
      {path: 'all-medication',component: AllMedicationComponent, title:'Medication Mock-up - all medication - Dashboard' },
     
    ]
  },
   { path: 'user-login', component: UserLoginComponent, title: 'Medication Mock-up - user sign in' }, // this component won't have layout component impact
   { path: 'user-sign-up', component: UserRegisterComponent, title: 'Medication Mock-up - user sign up' }, // this component won't have layout component impact
 ]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
