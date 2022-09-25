import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, TitleStrategy } from '@angular/router';
import { HttpService } from 'src/app/_services/common/http.service';
import { NotificationService } from 'src/app/_services/common/notification.service';
@Component({
  selector: 'app-one-field',
  templateUrl: './one-field.component.html',
  styleUrls: ['./one-field.component.css']
})
export class OneFieldComponent implements OnInit {
@Input() entityName: string;

  displayedColumns = ['name', 'id'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  allUnits: any[] = [];
  formGroup: FormGroup;
  constructor(
    private _httpService: HttpService,
    private _toastr: NotificationService,
    private _router: Router,
  ) { }    
  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        id: new FormControl(0),
        'name': new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])
      });
    this.loadUnits();
  }
  //== get errors
  getNameError() {
    return this.formGroup.get('name')!.hasError('required') ? 'Field is required' :
      this.formGroup.get('name')!.hasError('minlength') ? 'Min 2 characters' : 
      this.formGroup.get('name')!.hasError('maxlength') ? 'Maximum 50 characters' : 
      
      '';
  }
  //== get errors

  save = () => {
    this.unitAdd(false);
  }
  unitAdd = (isRedirectToList = false) => {

    if (this.formGroup.value.name == null) {
      this._toastr.warning('Name field is required', '');
    }
    else {      
      var isUnitExist = this.allUnits.filter(row => row.name.trim().toLowerCase() == this.formGroup.value.name?.trim()?.toLowerCase());
      if (isUnitExist.length > 0) {
        if (this.formGroup.value.id != 0) {
          var isSameUnit = isUnitExist.find(row => row.id == this.formGroup.value.id);
          if (isSameUnit) {
            if (isSameUnit.name.trim().toLowerCase() != this.formGroup.value.name?.trim()?.toLowerCase()) {
              this._toastr.info(this.entityName+' ' + this.formGroup.value.name + ' already exist', 'Exist');
              return;
            }
          }
          else if (isSameUnit == undefined) {
            this._toastr.info(this.entityName+' ' + this.formGroup.value.name + ' already exist', 'Exist');
            return;
          }
        }
        else {
          this._toastr.info(this.entityName+' ' + this.formGroup.value.name + ' already exist', 'Exist');
          return;
        }

      }

      var inputJSON = JSON.stringify(this.formGroup.value);
      this._httpService.post(this.entityName+'/' + (this.formGroup.value.id == 0 ? 'Create' : 'Update'), inputJSON, true)
        .subscribe(responseJSON => {
          if (responseJSON.isSuccess) {
            this._toastr.success(responseJSON.message, '');

            this.formReset();
            this.loadUnits();
          }
          else {
            var message = responseJSON.message;
            message.replace("\n", "<br/>");
            this._toastr.warning(message, '');

          }
        })
    }
  }

  //== get all & load table
  async loadUnits() {
    await this._httpService.get(this.entityName +'/GetAll')
      .subscribe((responseJSON: { isSuccess: any; resultJSON: any; }) => {
        if (responseJSON.isSuccess) {
          this.dataSource = new MatTableDataSource(responseJSON.resultJSON);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.allUnits = responseJSON.resultJSON;
        }
      });

  }
  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  //-- get all & load table
  delete = ()=>{
    var inputJSON = `{"id":"${this.formGroup.value.id}"}`;    
    this._httpService.post(this.entityName+' ' +'/Delete', inputJSON,true)
      .subscribe(responseJSON => {
        let self = this;
        if (responseJSON.isSuccess) {
          this._toastr.success(responseJSON.message, 'deleted');  
          this.loadUnits();
          this.formReset();    
        }
        else {
          var message = responseJSON.message;
          message.replace("\n", "<br/>");
          this._toastr.warning(message, '');

        }        
      });
  }
  getById = (id: number) => {    
    var unit = this.allUnits.find(row => row.id == id);
    this.formGroup.setValue({
      id: unit.id,
      name: unit.name
    });
  }
  formReset = (id: number = 0) => {
    this.formGroup.reset();
    this.formGroup.value.id = id;
  }
}
