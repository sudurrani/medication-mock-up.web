import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialComponentsModule } from '../MaterialComponentsModule';
import { CarouselModule } from '../_common/carousel/carousel.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';



@NgModule({
  declarations: [
    UserLoginComponent,
    UserRegisterComponent,    
  ],
  imports: [
    //BrowserModule,
    //FormsModule,       
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    //BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
    CarouselModule,
    MaterialComponentsModule
  ],
  exports: [
    UserLoginComponent,
    UserRegisterComponent,    
  ],
})
export class UserManagementModule { }
