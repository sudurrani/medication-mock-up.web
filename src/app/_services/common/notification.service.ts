import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  
  constructor(private toastr: ToastrService) { }
  add(){
    this.toastr.success('Record has been added successfully','Added');
  }
  update(){
    this.toastr.success('Record has been modified successfully','Modified');
  }
  delete(){
    this.toastr.success('Record has been deleted successfully','Deleted');
  }
  error(message:string, title: string){
    this.toastr.error((message != null ? message : 'An error while processing your request'), (title != null ? title : 'Error')
      ,{
        //timeOut: 3000,
        //positionClass: 'toast-top-right',
        //sprogressBar: false,
        //closeButton: true,        
      })
  }
  success(message:any, title:any){
    this.toastr.success(message, title, {
      //timeOut: 3000,
      //positionClass: 'toast-top-right',
      //progressBar: false,
      //closeButton: true      
    })
  }
  
  // error(message:any, title:any){
  //     this.toastr.error(message, title)
  // }
  
  info(message:any, title:any){
      this.toastr.info(message, title)
  }
  
  warning(message:any, title:any){
    this.toastr.warning(message, title,{
      //timeOut: 6000,
      //positionClass: 'toast-top-right',
      //progressBar: true,      
    })
  }
  
}
