import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../_services/common/http.service';
import { ToastService } from '../../_services/common/toast.service ';
import { LoaderService } from '../../_services/loader/loader.service';
import { NotificationService } from '../../_services/common/notification.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit, OnDestroy {
  color = 'red';
  nickname: string = 'shahid';
  password: string = '12345678';
 
  isSuccess: boolean = true;
  isHidden: boolean = true;
  errorsArray: any[] = [];
  
  images = [
    {
      imageSrc: environment.assets + 'images/login/slider/slider-1.svg',
      imageAlt: '',
    },
    {
      imageSrc:
        environment.assets + 'images/login/slider/slider-2.svg',
      imageAlt: '',
    },
  ]
  _environment = environment;
  //fileds icons src
  nicknameSrc = this._environment.assets + 'images/login/nickname.svg';
  passwordSrc = this._environment.assets + 'images/login/password.svg';
  viewPasswordSrc = this._environment.assets + 'images/login/view.svg';
  
  loginFormGroup: FormGroup;
  constructor(
    private _httpService: HttpService,
    public toastService: ToastService,
    private _router: Router,
    public _loaderService: LoaderService,
    private _toastr: NotificationService,
    public dialog: MatDialog
  ) { }
 
  preview: string = '';
  ngOnInit(): void {
    this.loginFormGroup = new FormGroup(
      {
        id: new FormControl(0),
        'userName': new FormControl(null, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50)
        ]),
        'password': new FormControl(null, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50)
        ]),        
      });
  }
  //== get errors
  getPasswordError() {
    return this.loginFormGroup.get('password')!.hasError('required') ? 'Field is required' :
      this.loginFormGroup.get('password')!.hasError('minlength') ? 'Min 4 characters' :
        this.loginFormGroup.get('password')!.hasError('maxlength') ? 'Maximum 50 characters' :

          '';
  }
  //== get errors
  getUserNameError() {
    return this.loginFormGroup.get('userName')!.hasError('required') ? 'Field is required' :
      this.loginFormGroup.get('userName')!.hasError('minlength') ? 'Min 4 characters' :
      this.loginFormGroup.get('userName')!.hasError('maxlength') ? 'Maximum 50 characters' :

        '';
  }
  signIn() {
    //this._toastr.success('Test','title');
    //this._toastr.error('Test','title');
    //return;
    var inputJSON = JSON.stringify(this.loginFormGroup.value);


    //var inputJSON = `{"nickname":"${this.nickname}","password":"${this.password}"}`;
    //var inputJSON = '{"nickname": "shahid","password": "12345678"}';
    // var response = this.loginService.login(inputJSON );
    // response.subscribe(responseJSON => {  
    this._httpService.post('User/Signin', inputJSON)
      .subscribe(responseJSON => {        
        //this.isHidden = false;
        this.isSuccess = responseJSON.isSuccess;
        this.preview = responseJSON.message;
        this.preview.replace("\n", "<br/>");
        if (responseJSON.isSuccess) {
          debugger;
          this._toastr.success('logged in successfully!', '');
          localStorage.setItem('token', responseJSON.resultJSON.token);
          localStorage.setItem('user', JSON.stringify(responseJSON.resultJSON));
          this._router.navigate(['/home']);
        }
        else {
          //this.errorsArray = responseJSON.message.split('\n');
          //this.toastService.show('Invalid d dd ', { classname: 'bg-danger text-light', delay: 15000, header: 'Helloo' });
          this._toastr.error(responseJSON.message, '');

        }
      })

  }
  showStandard() {
    this.toastService.show('I am a standard toast');
  }
  ngOnDestroy(): void {
    this.toastService.clear();
  }
  focusNickname(): void {
    this.nicknameSrc = this._environment.assets + 'images/login/nickname-active.svg';
    console.log('nickNameIn');
  }
  focusOutNickname(): void {
    this.nicknameSrc = this._environment.assets + 'images/login/nickname.svg';
    console.log('nicknameOut');
  }
  focusPassword(): void {
    this.passwordSrc = this._environment.assets + 'images/login/password-active.svg';
    console.log('passwordIn');
  }
  focusOutPassword(): void {
    this.passwordSrc = this._environment.assets + 'images/login/password.svg';
    console.log('passwordOut');
  }
  showHidePassword(): void {    
    
  }

  
}
