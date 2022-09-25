import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../MaterialComponentsModule';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderComponent } from './page-header/page-header.component';
import { LayoutComponent } from './layout.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';




@NgModule({
  declarations: [
    LayoutComponent,
    PageHeaderComponent,
    HeaderComponent,
    MenuItemComponent
    
  ],
  imports: [
    //BrowserModule,
    //FormsModule,       
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    //BrowserAnimationsModule,
    CommonModule,
   
    
    //Custom Module
    MaterialComponentsModule
      
    
  ],
  exports: [
    LayoutComponent,
    PageHeaderComponent,
    HeaderComponent,
    MenuItemComponent
    
  ],
})
export class LayoutManagementModule { }
