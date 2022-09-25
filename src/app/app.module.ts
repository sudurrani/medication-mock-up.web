import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LayoutManagementModule } from './layout/layout-management.module';
import { MaterialComponentsModule } from './MaterialComponentsModule';
import { UserManagementModule } from './user-management/user-management.module';
import { InterceptorService } from './_services/loader/interceptor.service';

import { CarouselModule } from './_common/carousel/carousel.module';
import { MyMedicationComponent } from './my-medication/my-medication.component';
import { AllMedicationComponent } from './all-medication/all-medication.component';

@NgModule({
  declarations: [
    AppComponent,   
    HomeComponent, MyMedicationComponent, AllMedicationComponent,
    
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    HttpClientModule,
    ReactiveFormsModule,    
    CommonModule,
           
    
  
    

      
    //Custom Modules
    CarouselModule,
    LayoutManagementModule,    
    MaterialComponentsModule,    
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true, 
    }),    

    //Custom Modules
    LayoutManagementModule,
    UserManagementModule,            
    MaterialComponentsModule,    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
