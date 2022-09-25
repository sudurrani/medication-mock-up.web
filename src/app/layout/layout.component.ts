import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../_services/loader/loader.service';
import { Menu } from './menu.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent  implements OnInit {
  opened = true;
  constructor(private _router: Router ,
    public _loaderService: LoaderService 
    ) { }
  ngOnInit(): void {
    
    var token = localStorage.getItem('token');
    if (token == null) {
      this._router.navigate(['/user-login']);
    }
    
  }
  toggle(): void {
    this.opened = !this.opened;
  }

  menu: Menu = [
    {
      title: 'Home',
      icon: 'home',
      link: '/home',
      color: '#ff7f0e',
    },
   
    {
      title: 'My Medication',
      icon: 'list',
      link: '/my-medication',
      color: '#ff7f0e',
    },
    {
      title: 'All Medication',
      icon: 'list',
      link: '/all-medication',
      color: '#ff7f0e',
    },
   
  ];
}
