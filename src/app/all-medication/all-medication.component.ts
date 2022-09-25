import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpService } from '../_services/common/http.service';
import { NotificationService } from '../_services/common/notification.service';
import { ToastService } from '../_services/common/toast.service ';
import { LoaderService } from '../_services/loader/loader.service';

@Component({
  selector: 'app-all-medication',
  templateUrl: './all-medication.component.html',
  styleUrls: ['./all-medication.component.css']
})
export class AllMedicationComponent implements OnInit {

  displayedColumns = ['id', 'pin', 'medicationName', 'dosage', 'prescriptionDate', 'displayName', 'createdDate'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  _environment = environment;
  formGroup: FormGroup;

  allMedication: any[];
  constructor(
    private _httpService: HttpService,
    public toastService: ToastService,
    private _router: Router,
    public _loaderService: LoaderService,
    private _toastr: NotificationService
  ) { }

  preview: string = '';
  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        id: new FormControl(0),
        'medicationName': new FormControl(null, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50)
        ]),
        'dosage': new FormControl(null, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50)
        ]),
        'prescriptionDate': new FormControl(null, [
          Validators.required,
        ]),

      });
    this.getAll();
  }
  //== get errors
  getMedicationError() {
    return this.formGroup.get('medicationName')!.hasError('required') ? 'Field is required' :
      this.formGroup.get('medicationName')!.hasError('minlength') ? 'Min 4 characters' :
        this.formGroup.get('medicationName')!.hasError('maxlength') ? 'Maximum 50 characters' :

          '';
  }
  //== get errors
  getDosageError() {
    return this.formGroup.get('dosage')!.hasError('required') ? 'Field is required' :
      this.formGroup.get('dosage')!.hasError('minlength') ? 'Min 4 characters' :
        this.formGroup.get('dosage')!.hasError('maxlength') ? 'Maximum 50 characters' :

          '';
  }
  getMedicationDateError() {
    return this.formGroup.get('prescriptionDate')!.hasError('required') ? 'Field is required' :


      '';
  }
  async getAll() {
    await this._httpService.get('Medication/GetAll')
      .subscribe((responseJSON: { isSuccess: any; resultJSON: any; }) => {
        if (responseJSON.isSuccess) {
          this.dataSource = new MatTableDataSource(responseJSON.resultJSON);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.allMedication = responseJSON.resultJSON;
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
  //== action dropdown list
  allActions: any[] = [{ name: 'Edit' }, { name: 'Delete' }];
  selectedAction: string;// = null;

  changeEvent = (id: number) => {
    if (this.selectedAction == 'Delete') {
      if (confirm("Do you really want to delete this record") == true) {
        this.delete(id);
      } else {

      }
    }
    else if (this.selectedAction == 'Edit') {
      var unit = this.allMedication.find(row => row.id == id);
      this.formGroup.setValue({
        id: unit.id,
        prescriptionDate: unit.prescriptionDate,
        medicationName: unit.medicationName,
        dosage: unit.dosage
      });
    }

    this.selectedAction = '';
  }
  delete = (id: number) => {

    var inputJSON = `{"id":"${id}"}`;
    this._httpService.post('Medication/Delete', inputJSON, true)
      .subscribe(responseJSON => {
        let self = this;
        if (responseJSON.isSuccess) {
          this._toastr.success(responseJSON.message, 'deleted');
          this.getAll();
        }
        else {
          var message = responseJSON.message;
          message.replace("\n", "<br/>");
          this._toastr.warning(message, '');

        }
      });
  }
  save() {
    var inputJSON = JSON.stringify(this.formGroup.value);

    this._httpService.post('Medication/' + (this.formGroup.value.id == 0 ? 'Create' : 'Update'), inputJSON)
      .subscribe(responseJSON => {

        if (responseJSON.isSuccess) {
          this._toastr.success(responseJSON.message, '');
          this.getAll();
        }
        else {
          this._toastr.error(responseJSON.message, '');

        }
      })

  }
}
