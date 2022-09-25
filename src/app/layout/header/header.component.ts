import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  user:string = '';
  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
    var userDetail = localStorage.getItem('user');
    this.user = JSON.parse(userDetail!).displayName    
  }
  @Output() menuToggled = new EventEmitter<boolean>();

  //user: string = 'shahid';

  // constructor(private authService: AuthService) { }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this._router.navigate(['/user-login']);
  }
}
